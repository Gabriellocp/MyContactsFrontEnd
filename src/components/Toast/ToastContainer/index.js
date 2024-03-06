import React, { useEffect } from 'react';
import styles from './styles.scss';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setitems, handleAnimationEnd, handleRemoveItem, render,
  } = useAnimatedList();
  useEffect(() => {
    // Using document event listener
    // function handleAddToast(event) {
    //   const { text, type } = event.detail;
    //   setitems((prevState) => ([...prevState, { id: Math.random(), text, type }]));
    // }
    // // When component renders for the first time, add event listener
    // document.addEventListener('addtoast', handleAddToast);
    // // Remove the listener when component unmounts
    // return () => {
    //   document.removeEventListener('addtoast', handleAddToast);
    // };

    // Using custom event listener (EventManager)
    function handleAddToast({ text, type }) {
      setitems((prevState) => ([...prevState, { id: Math.random(), text, type }]));
    }
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.remove('addtoast', handleAddToast);
    };
  }, [setitems]);

  return (
    <div className={styles.container}>
      {render((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={(id) => handleRemoveItem(id)}
          isLeaving={isLeaving}
          onAnimationEnd={(id) => handleAnimationEnd(id)}
        />
      ))}
    </div>
  );
}
