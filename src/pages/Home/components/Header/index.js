import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

export default function Header({ error, qtyOfContacts, qtyOfFilteredContacts }) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = error ? 'flex-end' : (qtyOfContacts ? 'space-between' : 'center');
  return (
    <header className={styles.mainHeader} style={{ justifyContent: alignment }}>
      {(!error && !!qtyOfContacts)
          && <strong>{`${qtyOfFilteredContacts} Contact${qtyOfFilteredContacts === 1 ? '' : 's'}`}</strong>}
      <Link to="/new">New contact</Link>
    </header>
  );
}

Header.propTypes = {
  error: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
