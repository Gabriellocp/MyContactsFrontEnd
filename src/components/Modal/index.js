/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger, title, children, cancelLabel, confirmLabel,
  onCancel, onConfirm, visible, isLoading,
}) {
  const { shouldRender, elementRef } = useAnimatedUnmount(visible);
  if (!shouldRender) return null;
  return (
    <ReactPortal id="modalRoot">
      <div className={styles.overlay} ref={elementRef}>
        <div className={styles.container} danger={danger ? '' : null} data-leave={!visible}>
          <h1>{title}</h1>
          {children}

          <footer className={styles.footer}>
            <button
              type="button"
              disabled={isLoading}
              className={styles.cancelButton}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              isLoading={isLoading}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </footer>
        </div>
      </div>
    </ReactPortal>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
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
