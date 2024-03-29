import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactService from '../../services/ContactService';
import addToast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import Presentation from './Presentation';

export default function Container() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState();
  const params = useParams();
  const { id } = params;
  const contactFormRef = useRef(null);
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactService.getContactById(id);
        if (isMounted()) {
          contactFormRef.current.setFields(contact);
          setContactName(contact.name);
          setIsLoading(false);
        }
      } catch {
        if (isMounted()) {
          navigate('/');
          addToast({ type: 'ERROR', text: 'An error ocurred while loading your contact' });
        }
      }
    }
    loadContact();
  }, [id, navigate, isMounted]);
  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactService.updateContact(id, contact);
      setContactName(updatedContact.name);
      addToast({ type: 'SUCCESS', text: 'Editing completed' });
    } catch {
      addToast({ type: 'ERROR', text: 'Error while trying to edit' });
    }
  }
  return (
    <Presentation
      isLoading={isLoading}
      onSubmit={(contact) => handleSubmit(contact)}
      contactFormRef={contactFormRef}
      contactName={contactName}
    />
  );
}
