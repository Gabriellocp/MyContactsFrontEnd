import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Spinner from '../Spinner';

export default function Loader({ loading }) {
  if (!loading) { return null; }
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <Spinner />
    </div>,
    document.getElementById('modalRoot'),
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
