import { useEffect, useState } from 'react'

export function useVisibility(ref: any, root: string | null, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        root: root ? document.querySelector(root) : null,
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
