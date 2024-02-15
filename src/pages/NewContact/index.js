import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import useNewContact from './useNewContact';

export default function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm ref={contactFormRef} onSubmit={(value) => handleSubmit(value)} buttonLabel="Create Contact" />
    </>
  );
}
