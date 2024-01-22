/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const { setError, removeError, getErrorMessageByFieldName } = useErrors([]);
  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name, email, phone, category,
    });
  }

  function handleNameChange(e) {
    const { value } = e.target;
    setName(value);
    if (!value) {
      setError('name', 'Name is Required');
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    const { value } = e.target;
    setEmail(value);
    if (!value) {
      setError('email', 'E-mail is Required');
    } else if (!isEmailValid(value)) {
      setError('email', 'E-mail is not valid');
    } else {
      removeError('email');
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" label="Category" />
          <option value="Instagram" label="Instagram" />
        </Select>
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
