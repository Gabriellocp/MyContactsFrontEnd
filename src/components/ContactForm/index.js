/* eslint-disable react/jsx-no-bind */
import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
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

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    setFields: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone));
      setCategory(contact.category_id);
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategory('');
    },
  }), []);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      name, email, phone, category,
    });
    setIsSubmitting(false);
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
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail *"
          value={email}
          type="email"
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
          disabled={isSubmitting}

        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          maxLength="15"
          onChange={handlePhoneChange}
          disabled={isSubmitting}

        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}

        >
          <option value="" label="No category" />
          {
            categories.map((cat) => <option key={cat.id} value={cat.id} label={cat.name} />)
          }
        </Select>
      </FormGroup>
      <div className={styles.buttonContainer}>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
