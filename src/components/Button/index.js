import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Button({ children, danger, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unknown-property
    <button className={styles.button} type="button" danger={danger ? '' : null} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
};

Button.defaultProps = {
  danger: false,
};
