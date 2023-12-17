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
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true }
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

  function handleRightSwipe () {
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
    <Box sx={{ height: '100vh' }} {...handlers}>
      <div dangerouslySetInnerHTML={{ __html: hymn?.html }} />
      <StyledFab color='primary' aria-label='add' onClick={handleSearch}>
        <SearchIcon />
      </StyledFab>
    </Box>
  )
}

export default Hymn
