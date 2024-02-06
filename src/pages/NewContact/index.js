import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';

export default function NewContact() {
  async function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      categoryId: formData.category,
    };
    await ContactService.createContact(contact);
  }
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm onSubmit={(value) => handleSubmit(value)} buttonLabel="Create Contact" />
    </>
  );
}
