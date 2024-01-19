import React from 'react';
import styles from './styles.scss';

export default function Input(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input className={styles.input} {...props} />
  );
}
