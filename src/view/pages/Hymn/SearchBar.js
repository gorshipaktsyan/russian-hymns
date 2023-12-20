import { Box, FormControl, Input, TextField } from '@mui/material'
import './index.scss'
import styled from '@emotion/styled'

const StyledTextField = styled(TextField)({
  width: '100%',
  maxWidth: '300px',
  padding: '5px',
  '& input': {
    '-webkit-appearance': 'none',
    margin: '0'
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: '0'
  }
})
function SearchBar () {
  return (
    <FormControl>
      <StyledTextField
        type='number'
        label='поиск по русскому  номеру'
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
        // onChange={e => setRusNumber(e.target.value)}
      />{' '}
    </FormControl>
  )
}

export default SearchBar
