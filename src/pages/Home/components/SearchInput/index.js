import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function SearchInput({ value, onChange }) {
  return (

    <div className={styles.searchInput}>
      <input type="text" placeholder="Search contact by name" value={value} onChange={onChange} />
    </div>

  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
