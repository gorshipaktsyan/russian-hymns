import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop (currentNumber) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, currentNumber])

  return null
}

export default ScrollToTop
