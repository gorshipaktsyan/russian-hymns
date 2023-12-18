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
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
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
    <Box sx={{ maxWidth: '300px' }}>
      <List className='list-wrapper'>
        {RussianAlphabetCapital.map(letter => (
          <StyledListItem
            className='letter'
            key={letter}
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
