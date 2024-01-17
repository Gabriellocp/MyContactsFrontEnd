import React from 'react';
import styles from './styles.scss';
import Header from '../Header';
import ContactsList from '../ContactsList';
import ThemeProvider from '../../contexts/themeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Header />
        <ContactsList />
      </div>
    </ThemeProvider>
  );
}
