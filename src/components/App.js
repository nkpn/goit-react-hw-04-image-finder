import React, { useEffect, useState } from 'react';
//* Components
import Header from './Header';
import Container from './Container';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import Modal from './Modal/Modal';
import { fetchImages } from '../services/imageAPI';
import CustomLoader from './SpinnerLoader';
import Button from './Button';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetch();
  }, [searchQuery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const fetch = async () => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);

    try {
      const images = await fetchImages({ searchQuery, page });
      setImages(prevImages => [...prevImages, ...images.data.hits]);
      setPage(s => s + 1);
      setLoading(false);

      console.log(images);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      setErrors(error.response);
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const openModal = largeImageUrl => {
    setShowModal(true);
    setModalImage(largeImageUrl);
  };

  return (
    <>
      <Header />
      <Searchbar onSubmit={handleFormSubmit} />
      <Container>
        <ImageGallery images={images} onImgClick={openModal} />

        {images.length > 0 && <Button onLoadClick={fetch} />}
        {loading && <CustomLoader />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt="name" />
          </Modal>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}
export default App;
