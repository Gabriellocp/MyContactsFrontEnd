import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <div className={styles.errorContainer}>
      <img src={sad} alt=":(" />
      <div className={styles.details}>
        <strong>An error has occurred while trying to get your contacts</strong>
        <Button type="button" onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </div>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
