import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Input({ error, props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unknown-property
    <input className={styles.input} error={error ? '' : null} {...props} />
  );
}

Input.propTypes = {
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.any,
};

Input.defaultProps = {
  error: null,
  props: null,
};
