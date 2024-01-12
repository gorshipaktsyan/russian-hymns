import { useState, useEffect, useRef } from 'react'

const usePinchZoom = elementRef => {
  const [pinchState, setPinchState] = useState({
    distance: 0,
    zoomingState: null
  })
  const initialDistanceRef = useRef(0)

  const handleTouchStart = event => {
    if (event.touches.length === 2) {
      const distance = calculateDistance(event.touches[0], event.touches[1])
      initialDistanceRef.current = distance
    }
  }

  const handleTouchMove = event => {
    if (event.touches.length === 2) {
      const distance = calculateDistance(event.touches[0], event.touches[1])
      const pinchDifference = distance - initialDistanceRef.current

      setPinchState({
        distance: pinchDifference,
        zoomingState: pinchDifference > 0 ? 'ZOOM_IN' : 'ZOOM_OUT'
      })
    }
  }

  const calculateDistance = (point1, point2) => {
    const dx = point1.clientX - point2.clientX
    const dy = point1.clientY - point2.clientY

    return Math.sqrt(dx * dx + dy * dy)
  }

  useEffect(() => {
    const element = elementRef.current

    if (element) {
      element.addEventListener('touchstart', handleTouchStart)
      element.addEventListener('touchmove', handleTouchMove)

      return () => {
        element.removeEventListener('touchstart', handleTouchStart)
        element.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [elementRef])

  return {
    pinchState
  }
}

export { usePinchZoom }
