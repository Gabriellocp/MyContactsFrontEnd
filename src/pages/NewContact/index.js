import React, { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import addToast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);
  async function handleSubmit(formData) {
    try {
      await ContactService.createContact(formData);
      addToast({ text: 'Contact created', type: 'SUCCESS' });
      contactFormRef.current.resetFields();
    } catch {
      addToast({ text: 'Error while trying to register', type: 'ERROR' });
    }
  }
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm ref={contactFormRef} onSubmit={(value) => handleSubmit(value)} buttonLabel="Create Contact" />
    </>
  );
}
