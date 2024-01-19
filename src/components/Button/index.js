import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Button({ children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button className={styles.button} type="button" {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
