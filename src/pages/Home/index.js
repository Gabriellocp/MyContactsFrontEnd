import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trashcan from '../../assets/images/icons/trashcan.svg';
import sad from '../../assets/images/sad.svg';
import Loader from '../../components/Loader';
import ContactService from '../../services/ContactService';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactList = await ContactService.listContacts(orderBy);
      setContacts(contactList);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearch(event) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <>
      <Loader loading={isLoading} />
      <form className={styles.searchInput}>
        <input type="text" placeholder="Search contact by name" onChange={handleChangeSearch} />
      </form>
      <div className={styles.container}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <header hasError={error ? ' ' : null}>
          {!error && <strong>{`${filteredContacts.length} Contact${filteredContacts.length === 1 ? '' : 's'}`}</strong>}
          <Link to="/new">New contact</Link>
        </header>
        {error && (
        <div className={styles.errorContainer}>
          <img src={sad} alt=":(" />
          <div className={styles.details}>
            <strong>An error has occurred while trying to get your contacts</strong>
            <Button type="button" onClick={() => handleTryAgain()}>
              Try again
            </Button>
          </div>
        </div>
        )}
        {

          (!error && filteredContacts.length > 0) && (
            <>
              <header className={styles.listHeader}>
                <button onClick={handleToggleOrderBy} type="button">
                  Name
                  <img src={arrow} alt="order" order={orderBy} />
                </button>
              </header>
              {filteredContacts.map((contact) => (
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
              ))}

            </>

          )
        }

      </div>
    </>

  );
}
