import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Spinner from '../Spinner';

export default function Button({
  children, danger, isLoading, disabled, ...props
}) {
  return (
    <button
      className={styles.button}
      type="button"
      disabled={disabled || isLoading}
      // eslint-disable-next-line react/no-unknown-property
      danger={danger ? '' : null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {(!isLoading && children) || <Spinner size={16} />}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  danger: false,
  disabled: false,
  isLoading: false,
};
