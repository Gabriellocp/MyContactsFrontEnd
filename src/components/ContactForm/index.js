/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoryService from '../../services/CategoryService';

export default function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors([]);
  const isFormValid = name && errors.length === 0 && isEmailValid(email);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.listCategories();
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
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
  function handlePhoneChange(e) {
    const { value } = e.target;
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
      noValidate
    >
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail *"
          value={email}
          type="email"
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          maxLength="15"
          onChange={handlePhoneChange}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="" label="No category" />
          {
            categories.map((cat) => <option key={cat.id} value={cat.id} label={cat.name} />)
          }
        </Select>
      </FormGroup>
      <div className={styles.buttonContainer}>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
