import { useEffect, useState } from 'react'
import persistentStore from '../services/PersistentStore'
import { Box, Collapse, Fab, TextField } from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'
import useMediaQuery from '@mui/material/useMediaQuery'

const SearchedBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
const DesktopStyledTextField = styled(TextField)({
  maxWidth: '300px',
  backgroundColor: '#f1f1e0',
  borderRadius: '30px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '30px'
  },
  '& input': {
    '-webkit-appearance': 'none',
    margin: '0',
    padding: '0px 8px',
    fontSize: '20px'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: '0'
  }
})
const MobileStyledTextField = styled(TextField)({
  position: 'fixed',
  bottom: '30px',
  right: '25px',
  width: '80%',
  maxWidth: '500px',
  border: '1px solid black',
  borderRadius: '30px',
  backgroundColor: '#f1f1e0',
  transition: 'width 0.5s',
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '30px'
  },
  '& input': {
    '-webkit-appearance': 'none',
    margin: '0'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: '0'
  }
})
const StyledFab = styled(Fab)({
  zIndex: 1000,
  position: 'fixed',
  bottom: '30px',
  right: '25px',
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'black' }
})
const StyledSearchIcon = styled(SearchIcon)({
  marginLeft: '10px',
  '&:hover': { color: 'grey' }
})

function SearchBar ({ setCurrentNumber, open, setOpen }) {
  const [number, setNumber] = useState('')
  const matches = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        DesktophandleClick(event)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [DesktophandleClick])

  useEffect(() => {
    if (matches) {
      setOpen(false)
    }
  }, [matches, setOpen])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function DesktophandleClick (e) {
    e.preventDefault()
    const numbers = number.split(',').map(num => Number(num.trim()))
    setCurrentNumber(numbers)
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    let hymnObject = { number: numbers, date: currentDate }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', updatedHymns)
    setNumber('')
  }
  function MobilehandleClick (e) {
    e.preventDefault()
    if (number && open) {
      const numbers = number.split(',').map(num => Number(num.trim()))
      setCurrentNumber(numbers)
      const currentDate = new Date()
      const searchedNumbers = persistentStore.get('searchedNumbers') || []
      let hymnObject = { number: numbers, date: currentDate }
      const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
      persistentStore.set('searchedNumbers', updatedHymns)
      setNumber('')
      setOpen(!open)
    } else {
      setOpen(!open)
    }
  }
  return matches ? (
    <SearchedBox>
      <DesktopStyledTextField
        type='decimal'
        value={number}
        inputProps={{
          inputMode: 'decimal',
          pattern: '[0-9]*'
        }}
        onChange={e => setNumber(e.target.value)}
      />
      <StyledSearchIcon onClick={e => DesktophandleClick(e)} />
    </SearchedBox>
  ) : (
    <Collapse orientation='horizontal' in={open} collapsedSize={40}>
      {open && (
        <MobileStyledTextField
          type='decimal'
          value={number}
          inputProps={{
            inputMode: 'decimal',
            pattern: '[0-9]*'
          }}
          onChange={e => setNumber(e.target.value)}
          autoFocus
        />
      )}
      <StyledFab
        color='primary'
        aria-label='add'
        onClick={e => MobilehandleClick(e)}
      >
        <SearchIcon />
      </StyledFab>
    </Collapse>
  )
}

export default SearchBar
