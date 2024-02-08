import React, { useEffect, useState } from 'react';
import styles from './styles.scss';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { text, type } = event.detail;
      setMessages((prevState) => ([...prevState, { id: Math.random(), text, type }]));
    }
    // When component renders for the first time, add event listener
    document.addEventListener('addtoast', handleAddToast);
    // Remove the listener when component unmounts
    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <ToastMessage id={message.id} type={message.type} message={message.text} />
      ))}
    </div>
  );
}
