import { useCallback, useState } from 'react';

export default function useAnimatedList() {
  const [items, setitems] = useState([]);

  // State to deal with lists' elements animations
  const [pendingRemovalitemsIds, setPendingRemovalitemsIds] = useState([]);
  const handleAnimationEnd = useCallback((id) => {
    setPendingRemovalitemsIds((prevState) => prevState.filter((mId) => mId !== id));
    setitems((prevState) => (prevState.filter((message) => message.id !== id)));
  }, []);
  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalitemsIds((prevState) => [...prevState, id]);
    // setitems((prevState) => (prevState.filter((message) => message.id !== id)));
  }, []);
  const render = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pendingRemovalitemsIds.includes(item.id),
    }))
  ), [items, pendingRemovalitemsIds]);
  return {
    setitems, handleAnimationEnd, handleRemoveItem, render,
  };
}
