import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function FormGroup({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
