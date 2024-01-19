import React from 'react';
import styles from './styles.scss';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <header>
      <img width={201} src={logo} alt="logo" />
      <form className={styles.searchInput}>
        <input type="text" placeholder="Search contact by name" />
      </form>
    </header>
  );
}
