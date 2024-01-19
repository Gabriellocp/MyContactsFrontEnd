/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Button from '../Button';

export default function Modal({ danger }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container} danger={danger ? '' : null}>
        <h1>Modals title</h1>
        <p>
          Modals body
        </p>
        <footer className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={() => {}}>Cancel</button>
          <Button danger={danger}>Delete</Button>
        </footer>
      </div>
    </div>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};
Modal.defaultProps = {
  danger: false,
};
