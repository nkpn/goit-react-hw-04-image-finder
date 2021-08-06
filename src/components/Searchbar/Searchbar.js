import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';
import { notifyInfo, notifySuccess } from '../../services/Toast';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      notifyInfo();
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    notifySuccess();
  };

  return (
    <>
      <section className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleSubmit}>
          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Поиск картинок"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <button type="submit" className={style.SearchFormButton}>
            Поиск
          </button>
        </form>
      </section>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
