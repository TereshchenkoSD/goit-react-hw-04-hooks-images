import { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './components/Searchbar';

import Loader from './components/Loader';

import { fetchImages } from './components/services/Api';

import ImageGallery from './components/ImageGallery';

import Modal from './components/Modal';

import { AppContainer } from './App.styles';
import LoadMoreButton from './components/Button';

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    reqStatus: 'idle',
    page: 1,
    showModal: false,
    tags: '',
    selectedImage: '',
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const shouldFetch =
      prevState.imageName !== imageName || prevState.page !== page;
    if (shouldFetch) {
      this.setState({ reqStatus: 'pending' });
      this.onFetchImages();
    }

    if (page > 1) {
      this.scrollPageToEnd();
    }
  }

  async onFetchImages() {
    const { imageName, page } = this.state;
    try {
      const images = await fetchImages(page, imageName);
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        reqStatus: 'resolved',
      }));
    } catch (error) {
      this.setState({ reqStatus: 'rejected', error: true });
      toast.error('Ooops, there is no such image');
    }
  }

  handleFormSubmit = imageName => {
    if (imageName.trim() === '') {
      toast.error('Invalid search query');
      return;
    }
    this.resetState();
    this.setState({ imageName });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSelectedImage = data => {
    this.setState({ selectedImage: data });
    this.toggleModal();
  };

  scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  onLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetState = () => {
    this.setState({
      imageName: null,
      page: 1,
      images: [],
      status: 'idle',
    });
  };

  render() {
    const { images, showModal, selectedImage, reqStatus, error } = this.state;
    const showImages = images.length > 11;

    return (
      <AppContainer>
        {error && toast.error('No such pictures on the server!')}
        <Searchbar onSearch={this.handleFormSubmit} />
        {reqStatus === 'pending' && <Loader />}
        <ImageGallery onSelect={this.handleSelectedImage} images={images} />
        {showImages && <LoadMoreButton onClick={this.onLoadMoreBtn} />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
        )}
        <Toaster position="top-right" />
      </AppContainer>
    );
  }
}
