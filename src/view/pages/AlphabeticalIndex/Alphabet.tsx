import { Box } from '@mui/material';

import { setLetter } from '../../../redux/slice/alphabeticalSlice';

import AlphabeticalStyledComponents from './styles';
import { AppDispatch } from '../../../redux/store';
import { RussianLanguageTypes } from '../../../types';

interface Alphabet {
  dispatch: AppDispatch;
  language: RussianLanguageTypes;
}

const { StyledAlphabet, StyledLetter } = AlphabeticalStyledComponents;

function Alphabet({ dispatch, language }: Alphabet) {
  function handleClick(letter: string): void {
    dispatch(setLetter(letter));
  }

  return (
    <Box sx={{ maxWidth: '250px' }}>
      <StyledAlphabet>
        {language.alphabeticalIndex.alphabet.map((letter, index) => (
          <StyledLetter key={index} onClick={() => handleClick(letter)}>
            {letter}
          </StyledLetter>
        ))}
      </StyledAlphabet>
    </Box>
  );
}

export default Alphabet;
