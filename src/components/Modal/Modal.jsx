import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import React, { useEffect } from 'react';

import { Overlay, ModalContainer } from './Modal.styles';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    console.log('Повесил слушателя');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log('Снял слушателя');
    };
  });

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
