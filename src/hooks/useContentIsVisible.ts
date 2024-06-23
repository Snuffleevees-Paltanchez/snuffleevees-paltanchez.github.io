import { useEffect, useState } from 'react'

export const useContentIsVisible = ({
  ref,
  onIntersect,
}: {
  ref: React.MutableRefObject<HTMLElement | null>
  onIntersect: () => void
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        onIntersect()
      } else {
        setIsIntersecting(false)
      }
    })

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, onIntersect])

  return isIntersecting
}
