import { useState, useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './components/Searchbar';

import Loader from './components/Loader';

import { fetchImages } from './components/services/Api';

import ImageGallery from './components/ImageGallery';

import Modal from './components/Modal';

import { AppContainer } from './App.styles';
import LoadMoreButton from './components/Button';

const App = () => {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);

  const showImages = images.length > 11;

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setReqStatus('pending');

    async function onFetchImages() {
      try {
        const images = await fetchImages(page, imageName);
        setImages(prevState => [...prevState, ...images]);
        setReqStatus('resolved');
      } catch (error) {
        setReqStatus('rejected');
        setError(true);
        toast.error('Ooops, there is no such image');
      }
    }

    onFetchImages();

    if (page > 1) {
      scrollPageToEnd();
    }
  }, [page, imageName]);

  const handleFormSubmit = imageName => {
    if (imageName.trim() === '') {
      toast.error('Invalid search query');
      return;
    }
    resetState();
    setImageName(imageName);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectedImage = data => {
    setSelectedImage(data);
    toggleModal();
  };

  const scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  const onLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const resetState = () => {
    setImageName(null);
    setPage(1);
    setImages([]);
    setReqStatus('idle');
  };

  return (
    <AppContainer>
      {error && toast.error('No such pictures on the server!')}
      <Searchbar onSearch={handleFormSubmit} />
      {reqStatus === 'pending' && <Loader />}
      <ImageGallery onSelect={handleSelectedImage} images={images} />
      {showImages && <LoadMoreButton onClick={onLoadMoreBtn} />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={selectedImage} />
      )}
      <Toaster position="top-right" />
    </AppContainer>
  );
};

export default App;
