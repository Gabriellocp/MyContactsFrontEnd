import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function FormGroup({ children, error }) {
  return (
    <div className={styles.container}>
      {children}
      {error && <small>{error}</small>}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};
FormGroup.defaultProps = {
  error: null,
};
