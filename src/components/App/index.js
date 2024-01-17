import React from 'react';
import styles from './styles.scss';
import Header from '../Header';
import ContactsList from '../ContactsList';

export default function App() {
  return (
    <div className={styles.container}>
      <Header />
      <ContactsList />
    </div>
  );
}
