import { Box } from "@mui/material";
import AlphabeticalStyledComponents from "./styles";

const { StyledAlphabet, StyledLetter } = AlphabeticalStyledComponents;
function Alphabet({ setLetter, setTitle, language }) {
  function handleClick(letter) {
    setLetter(letter);
    setTitle(`${language.alphabeticalIndex.alphabeticalIndex} (${letter})`);
  }
  return (
    <Box sx={{ maxWidth: "250px" }}>
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
