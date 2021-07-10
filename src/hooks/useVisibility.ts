import { useEffect, useState } from 'react'

export function useVisibility(ref: any, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current as any) {
      observer.observe(ref.current);
    }
    return () => { observer.unobserve(ref.current as Element) };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
