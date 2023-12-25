import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import hymns from '../../services/storage/hymns.json'
import Box from '@mui/material/Box'
import SearchBar from './SearchBar'
import { Divider } from '@mui/material'
import styled from '@emotion/styled'
import './index.scss'

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true }
}
const StyledDivider = styled(Divider)({
  width: '400px',
  margin: '0 auto'
})
function Hymn ({ currentNumber, setCurrentNumber }) {
  const hymn = currentNumber.map(number =>
    hymns.find(h => Number(h.number) === Number(number))
  )
  const [open, setOpen] = useState(false)

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
      <SearchBar
        open={open}
        setOpen={setOpen}
        setCurrentNumber={setCurrentNumber}
      />
    </Box>
  )
}

export default Hymn
