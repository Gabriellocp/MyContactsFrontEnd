import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Spinner({ size }) {
  return (
    <div className={styles.spinner} style={{ fontSize: `${size}px` }} />
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 90,
};
