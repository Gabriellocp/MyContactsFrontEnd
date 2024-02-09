import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import addToast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        categoryId: formData.category,
      };
      await ContactService.createContact(contact);
      addToast({ text: 'Contact created', type: 'SUCCESS' });
    } catch {
      addToast({ text: 'Error while trying to register', type: 'ERROR' });
    }
  }
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm onSubmit={(value) => handleSubmit(value)} buttonLabel="Create Contact" />
    </>
  );
}
