import { useEffect, useState } from 'react'

export function useVisibility(ref: any, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin
      }
    )

    if (ref.current as any) {
      observer.observe(ref.current)
    }
    return () => { observer.unobserve(element) }
    // eslint-disable-next-line
  }, [])

  return isIntersecting
}
