import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HymnList from './HymnList'
import hymns from '../../services/storage/hymns.json'
import Button from '@mui/material/Button'
import { TextField, styled } from '@mui/material'
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

function Search ({ setCurrentNumber, setMultipleNumbers }) {
  const [rusNumber, setRusNumber] = useState('')
  const [engNumber, setEngNumber] = useState('')
  const [searchedText, setSearchedText] = useState('')
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  function searchRussianNumber (hymnObject) {
    const numbers = rusNumber.split(',').map(num => Number(num.trim()));
    setMultipleNumbers(numbers)
    hymnObject.number = Number(rusNumber)
  }
  function searchEnglishNumber (hymnObject) {
    const hymn = hymns.find(h => h.number_eng === Number(engNumber))
    setCurrentNumber([hymn.number])
    hymnObject.number = hymn.number
  }

  function handleSubmit (e) {
    e.preventDefault()
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    let hymnObject = { number: '', date: currentDate }
    if (rusNumber) {
      searchRussianNumber(hymnObject)
    } else if (engNumber) {
      searchEnglishNumber(hymnObject)
    } else if (searchedText) {
      setOpen(true)
      return
    } else {
      const randomNumber = Math.floor(Math.random() * 800)
      setCurrentNumber([Number(randomNumber)])
      hymnObject.number = Number(randomNumber)
    }
    const UPDATED_HYMNS = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    navigate('/russian-hymns')
  }

  return (
    <StyledForm>
      <StyledTextField
        label='поиск по русскому  номеру'
        value={rusNumber}
        inputProps={{
          type: 'decimal',
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
          //inputMode: 'decimal',
          //pattern: '[0-9,\\s]*'
        }}
        onChange={e => setEngNumber(e.target.value)}
      />
      <StyledTextField
        label='поиск по тексту'
        value={searchedText}
        inputProps={{
          inputMode: 'search'
        }}
        onChange={e => {
          const inputValue = e.target.value
          if (inputValue === '' || /^[\p{L}\s]+$/u.test(inputValue)) {
            setSearchedText(inputValue)
          }
        }}
      />
      <StyledButton type='submit' variant='contained' onClick={handleSubmit}>
        Поиск
      </StyledButton>
      <HymnList
        open={open}
        setOpen={setOpen}
        searchedText={searchedText}
        setCurrentNumber={setCurrentNumber}
        navigate={navigate}
      />
    </StyledForm>
  )
}

export default Search
