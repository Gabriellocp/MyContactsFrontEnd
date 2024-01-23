import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Input(props) {
  const { onChange, error } = props;
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unknown-property
    <input className={styles.input} onChange={onChange} {...props} error={error ? ' ' : null} />
  );
}

Input.propTypes = {
  error: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  error: null,
  onChange: null,
};
