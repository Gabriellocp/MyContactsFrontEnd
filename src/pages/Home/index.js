import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trashcan from '../../assets/images/icons/trashcan.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Loader from '../../components/Loader';
import ContactService from '../../services/ContactService';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import addToast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
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
  function handleDelete(contact) {
    setContactBeingDeleted(contact);
    setIsDeletedModalVisible(true);
  }
  function handleCloseDeleteModal() {
    setIsDeletedModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDelete() {
    try {
      setIsLoadingDelete(true);
      await ContactService.deleteContact(contactBeingDeleted.id);
      setContacts(
        (prevState) => (prevState.filter((contact) => contact.id !== contactBeingDeleted.id)),
      );
      addToast({ type: 'SUCCESS', text: 'Contact deleted' });
      handleCloseDeleteModal();
    } catch {
      addToast({ type: 'ERROR', text: 'Error while trying to delete' });
    } finally {
      setIsLoadingDelete(false);
    }
  }
  return (
    <>
      <Loader loading={isLoading} />
      {
        isDeletedModalVisible
      && (
      <Modal
        danger
        isLoading={isLoadingDelete}
        visible={isDeletedModalVisible}
        title={`Are you sure you want to delete "${contactBeingDeleted?.name}"?`}
        confirmLabel="Delete"
        onCalcel={() => handleCloseDeleteModal()}
        onConfirm={() => handleConfirmDelete()}
      >
        <p>This action can not be undone</p>
      </Modal>
      )
      }
      {!!contacts.length && (
      <form className={styles.searchInput}>
        <input type="text" placeholder="Search contact by name" onChange={handleChangeSearch} />
      </form>
      )}
      <div className={styles.container}>
        {/* eslint-disable-next-line react/no-unknown-property, no-nested-ternary */}
        <header className={styles.mainHeader} style={{ justifyContent: error ? 'flex-end' : (contacts.length ? 'space-between' : 'center') }}>
          {(!error && !!contacts.length)
          && <strong>{`${filteredContacts.length} Contact${filteredContacts.length === 1 ? '' : 's'}`}</strong>}
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

          !error && (
            <>
              {(!!searchTerm && !filteredContacts.length)
              && (
              <div className={styles.contactNotFound}>
                <img src={magnifierQuestion} alt="not found" />
                <p>
                  Contact with name
                  <strong>
                    {` ${searchTerm} `}
                  </strong>
                  not found!
                </p>
              </div>
              )}
              {(!contacts.length && !isLoading) && (
              <div className={styles.emptyListContainer}>
                <img src={emptyBox} alt="empty" />
                <p>
                  You do not have any contact yet.
                  Click on
                  <strong> ``New Contact`` </strong>
                  button to register a new contact!
                </p>
              </div>
              )}
              {!!filteredContacts.length && (
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
                        <button type="button" onClick={() => handleDelete(contact)}>
                          <img src={trashcan} alt="delete" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

            </>

          )
        }

      </div>
    </>

  );
}
