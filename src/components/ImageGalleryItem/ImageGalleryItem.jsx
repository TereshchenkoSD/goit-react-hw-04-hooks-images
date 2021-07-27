import PropTypes from 'prop-types';

import {
  GalleryItem,
  GalleryItemImage,
} from '../ImageGalleryItem/ImageGalleryItem.styles';

const imageGalleryItem = ({ largeImageURL, webformatURL, tags, onSelect }) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onSelect(largeImageURL)}
      />
    </GalleryItem>
  );
};

imageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};

export default imageGalleryItem;
