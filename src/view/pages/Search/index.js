import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hymns from '../../services/storage/hymns.json'
import Button from '@mui/material/Button'
import { TextField, styled } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
import './index.scss'

const StyledForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '10%'
})

const StyledButton = styled(Button)({
  background: 'black',
  margin: '1%',
  '&:hover': {
    background: 'grey'
  }
})
const StyledTextField = styled(TextField)({
  margin: '1%'
})

function Search ({ setCurrentNumber, setIsHymnPage }) {
  const [rusNumber, setRusNumber] = useState('')
  const [engNumber, setEngNumber] = useState('')

  const navigate = useNavigate()

  function handleSubmit (e) {
    e.preventDefault()
    const currentData = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    let HYMN_OBJECT = { number: '', date: currentData }

    if (rusNumber) {
      setCurrentNumber(Number(rusNumber))
      HYMN_OBJECT.number = Number(rusNumber)
    } else if (engNumber) {
      const hymn = hymns.find(h => h.number_eng === Number(engNumber))
      setCurrentNumber(hymn.number)
      HYMN_OBJECT.number = hymn.number
    } else {
      const randomNumber = Math.floor(Math.random() * 800)
      setCurrentNumber(Number(randomNumber))
      HYMN_OBJECT.number = Number(randomNumber)
    }

    const UPDATED_HYMNS = [...searchedNumbers, HYMN_OBJECT]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    navigate('/russian-hymns')
    setIsHymnPage(true)
  }

  function handleChange (e) {
    e.target.name === 'поиск'
      ? setRusNumber(e.target.value)
      : setEngNumber(e.target.value)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField
        name='поиск'
        label='Поиск'
        value={rusNumber}
        onChange={handleChange}
      />
      <StyledTextField
        name='search'
        label='Search'
        value={engNumber}
        onChange={handleChange}
      />
      <StyledButton type='submit' variant='contained'>
        Поиск
      </StyledButton>
    </StyledForm>
  )
}

export default Search
