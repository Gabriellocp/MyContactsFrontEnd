import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.scss';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Using document event listener
    // function handleAddToast(event) {
    //   const { text, type } = event.detail;
    //   setMessages((prevState) => ([...prevState, { id: Math.random(), text, type }]));
    // }
    // // When component renders for the first time, add event listener
    // document.addEventListener('addtoast', handleAddToast);
    // // Remove the listener when component unmounts
    // return () => {
    //   document.removeEventListener('addtoast', handleAddToast);
    // };

    // Using custom event listener (EventManager)
    function handleAddToast({ text, type }) {
      setMessages((prevState) => ([...prevState, { id: Math.random(), text, type }]));
    }
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.remove('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => (prevState.filter((message) => message.id !== id)));
  }, []);

  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={(id) => handleRemoveMessage(id)}

        />
      ))}
    </div>
  );
}
