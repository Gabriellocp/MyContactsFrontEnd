import {
  createRef,
  useCallback, useEffect, useRef, useState,
} from 'react';

export default function useAnimatedList() {
  const [items, setitems] = useState([]);
  // List with all refs of list items (useRef avoids unnecessary rendering, diff from useState)
  const listReferences = useRef(new Map());
  /**
   * animationEndListeners keep track of every item that already has a listener attached to it
   * This is for the case the animation takes too long to go off screen, so everytime the
   * useEffect would be called and probably result in inconsistents results
   */
  const animationEndListeners = useRef(new Map());
  // State to deal with lists' elements animations
  const [pendingRemovalitemsIds, setPendingRemovalitemsIds] = useState([]);
  const handleAnimationEnd = useCallback((id) => {
    setPendingRemovalitemsIds((prevState) => prevState.filter((mId) => mId !== id));
    setitems((prevState) => (prevState.filter((message) => message.id !== id)));
    // Remove listener from item
    const removeListener = animationEndListeners.current?.get(id);
    removeListener();
    animationEndListeners.current.delete(id);
    listReferences.current.delete(id);
  }, []);
  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalitemsIds((prevState) => [...prevState, id]);
    // setitems((prevState) => (prevState.filter((message) => message.id !== id)));
  }, []);
  const getAnimatedRef = useCallback((id) => {
    let animatedRef = listReferences.current.get(id);
    if (!animatedRef) {
      animatedRef = createRef(); // Creates an object {current: null}
      listReferences.current.set(id, animatedRef);
    }
    return animatedRef;
  }, []);
  const render = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalitemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);
      return renderItem(item, {
        isLeaving,
        animatedRef,
      });
    })
  ), [items, pendingRemovalitemsIds, getAnimatedRef]);
  // Go through each item that needs to be removed and add the eventListener on it
  useEffect(() => {
    pendingRemovalitemsIds.forEach((id) => {
      const animatedRef = listReferences.current.get(id)?.current;
      const hasListener = animationEndListeners.current.has(id);
      if (animatedRef && !hasListener) {
        const onAnimationEnd = () => handleAnimationEnd(id);
        const removeListener = () => animatedRef.removeEventListener('animationend', onAnimationEnd);
        animationEndListeners.current?.set(id, removeListener);
        animatedRef.addEventListener('animationend', onAnimationEnd);
      }
    });
    // If cleanup function was put here, every change
    // on array deps would execute it before run the useEffect
  }, [pendingRemovalitemsIds, handleAnimationEnd]);
  // As it's a custom hook, this useEffect is 'attached' to its parent
  // In this case ToastContainer will execute the cleanup when unmount
  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      if (removeListeners) {
        removeListeners.forEach((removeListener) => removeListener());
      }
    };
  }, []);
  return {
    setitems, handleAnimationEnd, handleRemoveItem, render,
  };
}
