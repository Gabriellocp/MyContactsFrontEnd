import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import arrow from '../../assets/images/icons/arrow.svg';

export default function PageHeader({ title }) {
  return (
    <header className={styles.pageHeader}>
      <Link to="/">
        <img src={arrow} alt="back" />
        <span>Back</span>
      </Link>
      <h1>{title}</h1>
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
