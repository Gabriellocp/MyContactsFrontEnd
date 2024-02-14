import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

export default function Loader({ loading }) {
  if (!loading) { return null; }
  return (
    <ReactPortal id="modalRoot">
      <div className={styles.overlay}>
        <Spinner />
      </div>
    </ReactPortal>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
