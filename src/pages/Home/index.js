import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trashcan from '../../assets/images/icons/trashcan.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  useEffect(() => {
    fetch(`http://localhost:3000/contacts?order=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <>
      <form className={styles.searchInput}>
        <input type="text" placeholder="Search contact by name" />
      </form>
      <div className={styles.container}>
        <header>
          <strong>{`${contacts.length} Contact${contacts.length === 1 ? 's' : ''}`}</strong>
          <Link to="/new">New contact</Link>
        </header>
        <header className={styles.listHeader}>
          <button onClick={handleToggleOrderBy} type="button">
            Name
            <img src={arrow} alt="order" order={orderBy} />
          </button>
        </header>
        {
            contacts.map((contact) => (
              <div key={contact.id} className={styles.card}>
                <div className={styles.info}>
                  <div className={styles.contact}>
                    <strong>{contact.name}</strong>
                    {contact.category && <small>{contact.category}</small>}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>
                <div className={styles.actions}>
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="edit" />
                  </Link>
                  <button type="button" onClick={() => {}}>
                    <img src={trashcan} alt="delete" />
                  </button>
                </div>
              </div>
            ))
          }

      </div>
    </>

  );
}
