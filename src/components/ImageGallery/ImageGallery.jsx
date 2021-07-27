import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styles';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onSelect }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onSelect={onSelect}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

export default ImageGallery;
