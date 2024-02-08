import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './styles.scss';
import Header from '../Header';
import ThemeProvider from '../../contexts/themeContext';
import AppRoutes from '../../routes';
import ToastContainer from '../Toast/ToastContainer';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className={styles.container}>
          <ToastContainer />
          <Header />
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
