import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './styles.scss';
import Header from '../Header';
import ThemeProvider from '../../contexts/themeContext';
import AppRoutes from '../../routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className={styles.container}>
          <Header />
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
