import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Spinner from '../Spinner';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <div className={styles.container}>
      <div className={styles.formItem}>
        {children}
        {isLoading &&
        <div className={styles.loader}>
            <Spinner className="loader" size={16} />
        </div>}
      </div>
      {error && <small>{error}</small>}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};
FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
