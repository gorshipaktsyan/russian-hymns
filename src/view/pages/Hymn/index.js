import React, { useEffect, useMemo, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import hymns from '../../services/storage/hymns.json'
import Box from '@mui/material/Box'
import './index.scss'
import StyledComponents from '../../../utils/sharedStyles'

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true }
}
const { StyledDivider } = StyledComponents

function Hymn ({ open, currentNumber, setCurrentNumber }) {
  const [fontSize, setFontSize] = useState(1)
  const [initialPinchDistance, setInitialPinchDistance] = useState(null)

  const hymn = useMemo(
    () =>
      currentNumber.map(number =>
        hymns.find(h => Number(h.number) === Number(number))
      ),
    [currentNumber]
  )

  const handleTouchStart = e => {
    if (e.touches.length === 2) {
      // Calculate initial pinch distance
      const x1 = e.touches[0].clientX
      const y1 = e.touches[0].clientY
      const x2 = e.touches[1].clientX
      const y2 = e.touches[1].clientY

      const pinchDistance = Math.hypot(x2 - x1, y2 - y1)
      setInitialPinchDistance(pinchDistance)
    }
  }

  const handleTouchMove = e => {
    if (initialPinchDistance !== null && e.touches.length === 2) {
      // Calculate current pinch distance
      const x1 = e.touches[0].clientX
      const y1 = e.touches[0].clientY
      const x2 = e.touches[1].clientX
      const y2 = e.touches[1].clientY

      const currentPinchDistance = Math.hypot(x2 - x1, y2 - y1)

      // Adjust font size based on pinch distance
      const pinchDelta = currentPinchDistance - initialPinchDistance
      const newFontSize = fontSize + pinchDelta * 0.01

      // Ensure the font size stays within a reasonable range
      const clampedFontSize = Math.max(0.8, Math.min(2.0, newFontSize))

      setFontSize(clampedFontSize)
    }
  }

  const handleTouchEnd = () => {
    // Reset initial pinch distance when the pinch ends
    setInitialPinchDistance(null)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleLeftSwipe () {
    if (open) {
      return
    }
    const index = hymns.findIndex(
      el => Number(el.number) === Number(currentNumber[0] + 1)
    )
    if (index !== -1) {
      setCurrentNumber([currentNumber[0] + 1])
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleRightSwipe () {
    if (open) {
      return
    }
    const index = hymns.findIndex(
      el => Number(el.number) === Number(currentNumber[0] - 1)
    )
    if (index !== -1) {
      setCurrentNumber([currentNumber[0] - 1])
    }
  }
  const handlers = useSwipeable(
    {
      onSwipedLeft: () => handleLeftSwipe(),
      onSwipedRight: () => handleRightSwipe(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true
    },
    config
  )

  useEffect(() => {
    const boxElement = document.querySelector('.hymns-page-wrapper')
    if (boxElement) {
      boxElement.style.fontSize = `${fontSize}em`
    }
    return () => {
      if (boxElement) {
        boxElement.style.fontSize = ''
      }
    }
  }, [fontSize])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'ArrowLeft') {
        handleRightSwipe()
      } else if (event.key === 'ArrowRight') {
        handleLeftSwipe()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false
    })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleRightSwipe, handleLeftSwipe, handleTouchStart, handleTouchMove])

  return (
    <Box
      className='hymns-page-wrapper'
      sx={{
        paddingBottom: '200px'
      }}
      {...handlers}
    >
      {hymn.map((h, index) => {
        return (
          <Box key={index}>
            <div className='hymnInfo'>
              {hymn.length > 1 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `Гимн ${h.number}<sup>${h.sign}</sup>`
                  }}
                />
              )}
            </div>
            <Box dangerouslySetInnerHTML={{ __html: h?.html }} />
            {index !== hymn.length - 1 && <StyledDivider />}
          </Box>
        )
      })}
    </Box>
  )
}

export default Hymn
