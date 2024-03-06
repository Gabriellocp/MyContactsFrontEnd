import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const elementRef = useRef(null);

  useEffect(() => {
    const ref = elementRef.current;
    const handleAnimationEnd = () => {
      setShouldRender(false);
    };
    if (visible) setShouldRender(true);
    if (!visible && ref) {
      ref.addEventListener('animationend', handleAnimationEnd);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);
  return { shouldRender, elementRef };
}
