import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HymnList from './HymnList'
import hymns from '../../services/storage/hymns.json'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { Alert, TextField, styled } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
import './index.scss'

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
    const numbers = rusNumber.split(',').map(num => Number(num.trim()))
    setCurrentNumber(numbers)
    return numbers
  }
  function searchEnglishNumber () {
    let numbers = engNumber.split(',').map(num => Number(num.trim()))
    const matchingHymns = hymns.filter(h => numbers.includes(h.number_eng))
    numbers = matchingHymns.map(h => h.number)
    setCurrentNumber(numbers)
    return numbers
  }

  function handleSubmit (e) {
    e.preventDefault()
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
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
      let hymnObject = { number, date: currentDate }
      const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
      persistentStore.set('searchedNumbers', updatedHymns)
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
        autoFocus
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
