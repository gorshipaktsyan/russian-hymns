import { Box, List, ListItem } from '@mui/material'
import styled from '@emotion/styled'
import './index.scss'

const RussianAlphabetCapital = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ж',
  'З',
  'И',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Э',
  'Я'
]
const StyledListItem = styled(ListItem)({
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 220)',
    cursor: 'pointer'
  }
})
function Alphabet ({ setLetter }) {
  return (
    <Box sx={{ maxWidth: '250px' }}>
      <List className='list-wrapper'>
        {RussianAlphabetCapital.map((letter, index) => (
          <StyledListItem
            className='letter'
            key={index}
            onClick={() => setLetter(letter)}
          >
            {letter}
          </StyledListItem>
        ))}
      </List>
    </Box>
  )
}

export default Alphabet
