import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trashcan from '../../../../assets/images/icons/trashcan.svg';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    !!filteredContacts.length && (
      <>
        <header className={styles.listHeader}>
          <button onClick={onToggleOrderBy} type="button">
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
              <button type="button" onClick={() => onDeleteContact(contact)}>
                <img src={trashcan} alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </>
    )

  );
}

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
};
