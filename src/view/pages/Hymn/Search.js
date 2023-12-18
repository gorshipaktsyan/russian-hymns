import React, { useState } from 'react'
import { TextField, styled } from '@mui/material'
import Button from '@mui/material/Button'

const StyledForm = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '5%'
})

const StyledButton = styled(Button)({
  width: '50%',
  maxWidth: '250px',
  background: 'black',
  '&:hover': {
    background: 'grey'
  }
})

const StyledTextField = styled(TextField)({
  marginBottom: '1%',
  width: '100%',
  maxWidth: '500px',
  '& input': {
    '-webkit-appearance': 'none',
    margin: '0'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: '0'
  }
})
function Search (setCurrentNumber) {
  const [number, setNumber] = useState('')

  function handleSubmit () {
    setCurrentNumber(number)
  }
  return (
    <StyledForm>
      <StyledTextField
        type='number'
        name='search'
        label='поиск'
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <StyledButton type='submit' variant='contained' onClick={handleSubmit}>
        Поиск
      </StyledButton>
    </StyledForm>
  )
}
export default Search
