import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm buttonLabel="Create Contact" />
    </>
  );
}
