/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);
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
      setErrors((prevState) => [...prevState, { field: 'name', message: 'Name is required' }]);
    } else {
      setErrors((prevState) => [...prevState].filter((err) => err.field !== 'name'));
    }
  }

  function handleEmailChange(e) {
    const { value } = e.target;
    setEmail(value);
    if (!value) {
      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail is required' }]);
    } else if (!isEmailValid(value)) {
      const emailAlreadyHasError = errors.find((err) => err.field === 'email');
      if (emailAlreadyHasError) return;
      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail is not valid' }]);
    } else {
      console.log('Alou');
      setErrors((prevState) => [...prevState].filter((err) => err.field !== 'email'));
    }
  }

  function getErrorMessageByFieldName(field) {
    return errors.find((err) => err.field === field)?.message;
  }

  function getErrorByFieldName(field) {
    return !!errors.find((err) => err.field === field);
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
          error={getErrorByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorByFieldName('email')}
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
