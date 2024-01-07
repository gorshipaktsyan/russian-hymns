import React, { useEffect, useMemo } from 'react'
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
  const hymn = useMemo(
    () =>
      currentNumber.map(number =>
        hymns.find(h => Number(h.number) === Number(number))
      ),
    [currentNumber]
  )
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
    const handleKeyDown = event => {
      if (event.key === 'ArrowLeft') {
        handleRightSwipe()
      } else if (event.key === 'ArrowRight') {
        handleLeftSwipe()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleRightSwipe, handleLeftSwipe])

  return (
    <Box className='hymns-page-wrapper' sx={{ height: '100vh' }} {...handlers}>
      {hymn.map((h, index) => {
        return (
          <Box key={index}>
            <Box dangerouslySetInnerHTML={{ __html: h?.html }} />
            {index !== hymn.length - 1 && <StyledDivider />}
          </Box>
        )
      })}
    </Box>
  )
}

export default Hymn
