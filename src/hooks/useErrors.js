import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError(field, message) {
    const errorAlreadyExists = errors.find((err) => err.field === field);
    if (errorAlreadyExists) return;
    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(field) {
    setErrors((prevState) => [...prevState].filter((err) => err.field !== field));
  }

  function getErrorMessageByFieldName(field) {
    return errors.find((err) => err.field === field)?.message;
  }

  return {
    setError, removeError, getErrorMessageByFieldName, errors,
  };
}
