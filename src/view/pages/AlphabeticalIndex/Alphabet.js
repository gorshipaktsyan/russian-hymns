import { Box } from '@mui/material'
import StyledComponents from '../../../utils/sharedStyles'

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
const { StyledAlphabet, StyledLetter } = StyledComponents
function Alphabet ({ setLetter }) {
  return (
    <Box sx={{ maxWidth: '250px' }}>
      <StyledAlphabet>
        {RussianAlphabetCapital.map((letter, index) => (
          <StyledLetter key={index} onClick={() => setLetter(letter)}>
            {letter}
          </StyledLetter>
        ))}
      </StyledAlphabet>
    </Box>
  )
}

export default Alphabet
