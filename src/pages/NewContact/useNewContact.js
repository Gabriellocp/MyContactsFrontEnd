import { useRef } from 'react';
import ContactService from '../../services/ContactService';
import addToast from '../../utils/toast';

export default function useNewContact() {
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
  return { contactFormRef, handleSubmit };
}
