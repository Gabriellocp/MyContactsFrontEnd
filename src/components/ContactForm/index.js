import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  return (
    <form className={styles.container}>
      <FormGroup error="Invalid format">
        <Input placeholder="Name" error />
      </FormGroup>
      <FormGroup>
        <Input placeholder="E-mail" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Phone" />
      </FormGroup>
      <FormGroup>
        <Select />
      </FormGroup>
      <div className={styles.buttonContainer}>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
