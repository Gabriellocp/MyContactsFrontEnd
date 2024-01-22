import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Input({
  error, onChange, props,
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unknown-property
    <input className={styles.input} error={error ? '' : null} onChange={onChange} {...props} />
  );
}

Input.propTypes = {
  error: PropTypes.bool,
  props: PropTypes.shape(),
  onChange: PropTypes.func,
};

Input.defaultProps = {
  error: null,
  props: null,
  onChange: null,
};
