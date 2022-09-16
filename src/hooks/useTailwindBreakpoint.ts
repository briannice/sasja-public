import { useEffect, useState } from 'react'

export function useTailwindBreakpoint() {
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!width) {
    return undefined
  }

  if (width >= 1280) {
    return 'desktop'
  }

  if (width >= 1024) {
    return 'laptop'
  }

  if (width >= 640) {
    return 'tablet'
  }

  return 'phone'
}
