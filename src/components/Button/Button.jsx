import PropTypes from 'react';

import { MoreButton } from './Button.styles';

const LoadMoreButton = ({ onClick }) => {
  return (
    <MoreButton type="submit" onClick={onClick}>
      Load more
    </MoreButton>
  );
};

LoadMoreButton.defaultProps = {
  onClick: () => null,
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};

export default LoadMoreButton;
