import { Box } from "@mui/material";
import AlphabeticalStyledComponents from "./styles";

const { StyledAlphabet, StyledLetter } = AlphabeticalStyledComponents;

function Alphabet({ setLetter, dispatch, lg, setTitle }) {
  function handleClick(letter) {
    setLetter(letter);
    dispatch(setTitle(`${lg.alphabeticalIndex.alphabeticalIndex} (${letter})`));
  }
  return (
    <Box sx={{ maxWidth: "250px" }}>
      <StyledAlphabet>
        {lg.alphabeticalIndex.alphabet.map((letter, index) => (
          <StyledLetter key={index} onClick={() => handleClick(letter)}>
            {letter}
          </StyledLetter>
        ))}
      </StyledAlphabet>
    </Box>
  );
}

export default Alphabet;
