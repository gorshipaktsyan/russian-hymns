import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import hymns from '../../services/storage/hymns.json'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'
import './index.scss'

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true } // options for touch listeners (*See Details*)
}
const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'grey' }
})

function Hymn ({ currentNumber, setCurrentNumber }) {
  const navigate = useNavigate()

  const hymn = hymns.find(h => Number(h.number) === Number(currentNumber))

  function handleLeftSwipe () {
    const index = hymns.findIndex(
      el => Number(el.number) === Number(currentNumber + 1)
    )
    if (index !== -1) {
      setCurrentNumber(currentNumber + 1)
    }
  }

  function handleRightSwipe (n) {
    const index = hymns.findIndex(
      el => Number(el.number) === Number(currentNumber - 1)
    )
    if (index !== -1) {
      setCurrentNumber(currentNumber - 1)
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

  function handleSearch () {
    navigate('/russian-hymns/search')
  }

  return (
    <Box sx={{ width: '100%' }} {...handlers}>
      {<div dangerouslySetInnerHTML={{ __html: hymn?.html }} />}
      <StyledFab color='primary' aria-label='add' onClick={handleSearch}>
        <SearchIcon />
      </StyledFab>
    </Box>
  )
}

export default Hymn
