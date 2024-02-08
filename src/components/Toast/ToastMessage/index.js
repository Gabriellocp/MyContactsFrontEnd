import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import xCircle from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({ message, type }) {
  return (
    <div className={[styles.container, styles[type.toLowerCase()] || styles.default].join(' ')}>
      {type === 'ERROR' && <img src={xCircle} alt="icon" />}
      {type === 'SUCCESS' && <img src={checkCircle} alt="icon" />}
      <strong>{message}</strong>
    </div>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['DEFAULT', 'ERROR', 'SUCCESS']),
};

ToastMessage.defaultProps = {
  type: 'DEFAULT',
};
