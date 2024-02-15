import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function Presentation({
  isLoading, contactName, contactFormRef, onSubmit,
}) {
  return (
    <>
      <Loader loading={isLoading} />
      <PageHeader title={isLoading ? 'Loading...' : `Edit Contact ${contactName}`} />
      <ContactForm ref={contactFormRef} onSubmit={(contact) => onSubmit(contact)} buttonLabel="Save Changes" />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};
