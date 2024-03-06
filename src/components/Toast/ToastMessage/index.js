/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import xCircle from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({
  message, onRemove, isLeaving, onAnimationEnd,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const elementRef = ref.current;
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }
    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }
    return () => {
      if (elementRef) elementRef.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, onAnimationEnd, message.id]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemove(message.id);
    }, 5000);

    return () => {
      // If component unmounts, 'kill' the setTimeout process
      clearTimeout(timeoutId);
    };
  }, [message, onRemove]);

  function handleRemoveToast() {
    onRemove(message.id);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      ref={ref}
      className={[styles.container, styles[message.type.toLowerCase()] || styles.default].join(' ')}
      onClick={handleRemoveToast}
      data-leaving={isLeaving}
    >
      {message.type === 'ERROR' && <img src={xCircle} alt="icon" />}
      {message.type === 'SUCCESS' && <img src={checkCircle} alt="icon" />}
      <strong>{message.text}</strong>
    </div>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['DEFAULT', 'ERROR', 'SUCCESS']),
    text: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};
