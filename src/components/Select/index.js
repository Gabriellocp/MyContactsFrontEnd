import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Select({ children, ...props }) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={styles.select} {...props}>
      {children}
    </select>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
};
