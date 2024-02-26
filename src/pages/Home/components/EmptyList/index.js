import React from 'react';
import styles from './styles.scss';
import emptyBox from '../../../../assets/images/empty-box.svg';

export default function EmptyList() {
  return (
    <div className={styles.emptyListContainer}>
      <img src={emptyBox} alt="empty" />
      <p>
        You do not have any contact yet.
        Click on
        <strong> ``New Contact`` </strong>
        button to register a new contact!
      </p>
    </div>
  );
}
