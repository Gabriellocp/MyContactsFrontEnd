import React from 'react';
import './styles.scss';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <header>
      <img width={201} src={logo} alt="logo" />
    </header>
  );
}
