import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HymnList from './HymnList'
import hymns from '../../services/storage/hymns.json'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { Alert, TextField, styled } from '@mui/material'
import './index.scss'
import historyStore from '../../services/HistoryStore'

const StyledForm = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '5%'
})

const StyledButton = styled(Button)({
  width: '50%',
  maxWidth: '150px',
  height: '50px',
  background: 'black',
  marginTop: '20px',
  '&:hover': {
    background: 'grey'
  }
})
const StyledTextField = styled(TextField)({
  width: '100%',
  maxWidth: '300px',
  marginTop: '10px',
  '& input': {
    '-webkit-appearance': 'none',
    margin: '0'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: '0'
  }
})

function Search ({ setCurrentNumber }) {
  const [rusNumber, setRusNumber] = useState('')
  const [engNumber, setEngNumber] = useState('')
  const [searchedText, setSearchedText] = useState('')
  const [openHymnList, setOpenHymnList] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const handleClose = () => setErrorAlert(false)
  const navigate = useNavigate()

  function searchRussianNumber () {
    return findSearchedNumbers(rusNumber, 'number')
  }
  function searchEnglishNumber () {
    return findSearchedNumbers(engNumber, 'number_eng')
  }
  function findSearchedNumbers (input, property) {
    const numbers = input.split(',').map(num => Number(num.trim()))
    const matchingHymns = hymns.filter(h => numbers.includes(h[property]))
    const resultNumbers = matchingHymns.map(h => h.number)
    setCurrentNumber(resultNumbers)
    return resultNumbers
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleSubmit (e) {
    e.preventDefault()
    let number
    if (rusNumber) {
      number = searchRussianNumber()
    } else if (engNumber) {
      number = searchEnglishNumber()
    } else if (searchedText) {
      setOpenHymnList(true)
      return
    } else {
      const randomNumber = Math.floor(Math.random() * 800)
      setCurrentNumber([randomNumber])
      number = [randomNumber]
    }

    if (number.length) {
      historyStore.set('searchedHymns', number)
      navigate('/russian-hymns')
    }
    setErrorAlert(true)
  }
  function handleTextChange (e) {
    const inputValue = e.target.value
    const inputValueLowerCase = inputValue.toLowerCase()
    const isAlphaNumeric = /^[a-zA-Zа-яА-Я0-9\s]+$/u.test(inputValue)
    if (inputValue === '' || isAlphaNumeric) {
      setSearchedText(inputValueLowerCase)
    }
  }
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        handleSubmit(event)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSubmit])

  return (
    <StyledForm>
      <StyledTextField
        type='decimal'
        label='поиск по русскому  номеру'
        value={rusNumber}
        inputProps={{
          inputMode: 'decimal',
          pattern: '[0-9]*'
        }}
        onChange={e => setRusNumber(e.target.value)}
      />
      <StyledTextField
        type='decimal'
        label='поиск по английскому номеру'
        value={engNumber}
        inputProps={{
          inputMode: 'decimal',
          pattern: '[0-9]*'
        }}
        onChange={e => setEngNumber(e.target.value)}
      />
      <StyledTextField
        label='поиск по тексту'
        value={searchedText}
        inputProps={{
          inputMode: 'search'
        }}
        onChange={handleTextChange}
      />
      <StyledButton type='submit' variant='contained' onClick={handleSubmit}>
        Поиск
      </StyledButton>
      <HymnList
        openHymnList={openHymnList}
        setOpenHymnList={setOpenHymnList}
        searchedText={searchedText}
        setCurrentNumber={setCurrentNumber}
        navigate={navigate}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorAlert}
        onClose={handleClose}
        message='I love snacks'
      >
        <Alert
          onClose={handleClose}
          severity='error'
          sx={{ width: '100%', marginTop: '50px' }}
        >
          Соответствующий гимн не найден!
        </Alert>
      </Snackbar>
    </StyledForm>
  )
}

export default Search
