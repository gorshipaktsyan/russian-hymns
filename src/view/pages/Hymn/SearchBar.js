import { useEffect, useState, useRef } from 'react'
import persistentStore from '../../services/PersistentStore'
import { Collapse, TextField } from '@mui/material'
import styled from '@emotion/styled'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'

const StyledTextField = styled(TextField)({
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
  '&:hover': { backgroundColor: 'grey' }
})

function SearchBar ({ open, setOpen, setCurrentNumber }) {
  const [number, setNumber] = useState('')
  const inputRef = useRef(null)

  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     if (
  //       open &&
  //       inputRef.current &&
  //       !inputRef.current.contains(event.target)
  //     ) {
  //       setOpen(false)
  //       console.log('searchbar', open)
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside)

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [setOpen])
  function handleClick () {
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
  return (
    <Collapse orientation='horizontal' in={open} collapsedSize={40}>
      {open && (
        <StyledTextField
          id='search-textfield'
          type='number'
          value={number}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
          ref={inputRef}
          onChange={e => setNumber(e.target.value)}
        />
      )}
      <StyledFab color='primary' aria-label='add' onClick={handleClick}>
        <SearchIcon />
      </StyledFab>
    </Collapse>
  )
}

export default SearchBar
