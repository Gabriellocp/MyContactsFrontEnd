import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (
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
  );
}
SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
