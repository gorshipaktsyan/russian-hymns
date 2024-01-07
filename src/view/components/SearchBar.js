import { useEffect, useState } from 'react'
import hymns from '../services/storage/hymns.json'
import { Collapse } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import SearchIcon from '@mui/icons-material/Search'
import useMediaQuery from '@mui/material/useMediaQuery'
import historyStore from '../services/HistoryStore'
import RightArrow from '@mui/icons-material/East'
import StyledComponents from '../../utils/sharedStyles'

const {
  SearchedBox,
  DesktopStyledTextField,
  MobileStyledTextField,
  StyledFab,
  StyledSearchIcon,
  StyledRightArrowIcon,
  StyledAlert
} = StyledComponents

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
    if (!matches && open && !number) {
      setOpen(false)
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
        autoHideDuration={2000}
      >
        <StyledAlert
          onClose={handleClose}
          severity='error'
          sx={{ width: '100%', marginTop: '50px' }}
        >
          Соответствующий гимн не найден!
        </StyledAlert>
      </Snackbar>
    </>
  )
}

export default SearchBar
