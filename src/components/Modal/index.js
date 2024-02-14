/* eslint-disable react/no-unknown-property */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Button from '../Button';

export default function Modal({
  danger, title, children, cancelLabel, confirmLabel,
  onCalcel, onConfirm, visible, isLoading,
}) {
  if (!visible) return null;
  return ReactDOM.createPortal(

    <div className={styles.overlay}>
      <div className={styles.container} danger={danger ? '' : null}>
        <h1>{title}</h1>
        {children}

        <footer className={styles.footer}>
          <button type="button" disabled={isLoading} className={styles.cancelButton} onClick={onCalcel}>{cancelLabel}</button>
          <Button
            danger={danger}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCalcel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
};
Modal.defaultProps = {
  cancelLabel: 'Cancel',
  confirmLabel: 'OK',
  isLoading: false,
  danger: false,
};
