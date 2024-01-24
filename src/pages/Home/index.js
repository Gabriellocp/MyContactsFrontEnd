import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trashcan from '../../assets/images/icons/trashcan.svg';

export default function Home() {
  return (
    <>
      <form className={styles.searchInput}>
        <input type="text" placeholder="Search contact by name" />
      </form>
      <div className={styles.container}>
        <header>
          <strong>3 Contacts</strong>
          <Link to="/new">New contact</Link>
        </header>
        <div className={styles.listContainer}>
          <header>
            <button onClick={() => {}} type="button">
              Name
              <img src={arrow} alt="order" />
            </button>
          </header>
          <div className={styles.card}>
            <div className={styles.info}>
              <div className={styles.contact}>
                <strong>Name</strong>
                <small>Instagram</small>
              </div>
              <span>Email</span>
              <span>Phone</span>
            </div>
            <div className={styles.actions}>
              <Link to="/edit/123">
                <img src={edit} alt="edit" />
              </Link>
              <button type="button" onClick={() => {}}>
                <img src={trashcan} alt="delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
