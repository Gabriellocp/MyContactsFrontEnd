import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Loader({ loading }) {
  if (!loading) { return null; }
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.loader} />
    </div>,
    document.getElementById('modalRoot'),
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
