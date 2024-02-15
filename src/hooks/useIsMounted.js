import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Deps array is empty since it's a reference
  const getCurrentValue = useCallback(() => isMounted.current, []);
  // Can not return isMounted.current because it's not the 'current' value itself,
  // it will always return the initial ref value
  return getCurrentValue;
}
