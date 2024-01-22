import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.scss';

export default function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.loader} />
    </div>,
    document.getElementById('modalRoot'),
  );
}
