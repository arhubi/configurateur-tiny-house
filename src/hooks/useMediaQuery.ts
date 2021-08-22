import { useState, useEffect } from 'react'
import { size, device } from '../theme/device'

type ScreenSize = keyof typeof size

export function useMediaQuery(screenSize: ScreenSize) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(device[screenSize])
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    };
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, screenSize])

  return matches
}
