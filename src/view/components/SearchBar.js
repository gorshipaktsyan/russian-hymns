import { useEffect, useState } from 'react'
import hymns from '../services/storage/hymns.json'
import { Box, Collapse, Fab, TextField, Alert } from '@mui/material'
import styled from '@emotion/styled'
import Snackbar from '@mui/material/Snackbar'
import SearchIcon from '@mui/icons-material/Search'
import useMediaQuery from '@mui/material/useMediaQuery'
import historyStore from '../services/HistoryStore'
import RightArrow from '@mui/icons-material/East'
const SearchedBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
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
  fontSize: '30px',
  marginLeft: '10px',
  '&:hover': { color: 'grey' }
})
const StyledRightArrowIcon = styled(RightArrow)({
  fontSize: '30px',
  marginLeft: '10px',
  '&:hover': { color: 'grey' }
})

function SearchBar ({ setCurrentNumber, open, setOpen }) {
  const [number, setNumber] = useState('')
  const [errorAlert, setErrorAlert] = useState(false)
  const handleClose = () => setErrorAlert(false)
  const matches = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    const handleKeyDown = event => {
      if (number && event.key === 'Enter') {
        handleClick(event)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClick, number])

  useEffect(() => {
    if (matches) {
      setOpen(false)
    }
  }, [matches, setOpen])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleClick (e) {
    e.preventDefault()
    const numbers = number.split(',').map(num => Number(num.trim()))
    const matchingHymns = hymns.filter(h => numbers.includes(h.number))

    if (matches && matchingHymns.length) {
      handleResult(matchingHymns)
      return
    }
    if (open && number && matchingHymns.length) {
      handleResult(matchingHymns)
      setOpen(!open)
      return
    }
    if (!matches && !open) {
      setOpen(true)
      return
    }
    setErrorAlert(true)
    setNumber('')
    setOpen(false)
  }

  function handleResult (matchingHymns) {
    const resultNumbers = matchingHymns.map(h => h.number)
    historyStore.set('searchedHymns', resultNumbers)
    setCurrentNumber(resultNumbers)
    setNumber('')
  }

  return (
    <>
      {matches ? (
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
          {number ? (
            <StyledRightArrowIcon onClick={e => handleClick(e)} />
          ) : (
            <StyledSearchIcon />
          )}
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
            onClick={e => handleClick(e)}
          >
            {number ? <RightArrow /> : <SearchIcon />}
          </StyledFab>
        </Collapse>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorAlert}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          sx={{ width: '100%', marginTop: '50px' }}
        >
          Соответствующий гимн не найден!
        </Alert>
      </Snackbar>
    </>
  )
}

export default SearchBar
