import { useEffect, useState } from 'react'
import persistentStore from '../services/PersistentStore'
import { Box, TextField } from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'

const SearchedBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
const StyledTextField = styled(TextField)({
  maxWidth: '300px',
  backgroundColor: '#f1f1e0',
  '& input': {
    padding: '0px',
    fontSize: '20px'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    padding: '0px'
  }
})
const StyledSearchIcon = styled(SearchIcon)({
  marginLeft: '10px',
  '&:hover': { color: 'grey' }
})

function SearchBar ({ setCurrentNumber }) {
  const [number, setNumber] = useState('')

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        handleClick()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClick])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleClick () {
    const numbers = number.split(',').map(num => Number(num.trim()))
    setCurrentNumber(numbers)
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    let hymnObject = { number: numbers, date: currentDate }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', updatedHymns)
    setNumber('')
  }

  return (
    <SearchedBox>
      <StyledTextField
        type='decimal'
        value={number}
        inputProps={{
          inputMode: 'decimal',
          pattern: '[0-9]*'
        }}
        onChange={e => setNumber(e.target.value)}
      />
      <StyledSearchIcon onClick={handleClick} />
    </SearchedBox>
  )
}

export default SearchBar
