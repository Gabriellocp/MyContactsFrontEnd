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
    console.log(errors);
    setEmail(value);
    if (!value) {
      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail is required' }]);
    } else if (!isEmailValid(value)) {
      const emailAlreadyHasError = errors.find((err) => err.field === 'email');
      if (emailAlreadyHasError) return;
      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail is not valid' }]);
    } else {
      setErrors((prevState) => [...prevState].filter((err) => err.field !== 'email'));
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <FormGroup error={errors[0]?.message}>
        <Input
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          error={!!errors[0]}
        />
      </FormGroup>
      <FormGroup error={errors[1]?.message}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={!!errors[1]}
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
