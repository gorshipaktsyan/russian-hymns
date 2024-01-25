import { Box } from "@mui/material";
import AlphabeticalStyledComponents from "./styles";

const RussianAlphabetCapital = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Э",
  "Я",
];
const { StyledAlphabet, StyledLetter } = AlphabeticalStyledComponents;
function Alphabet({ setLetter, setTitle }) {
  function handleClick(letter) {
    setLetter(letter);
    setTitle(`Алфавитный указатель (${letter})`);
  }
  return (
    <Box sx={{ maxWidth: "250px" }}>
      <StyledAlphabet>
        {RussianAlphabetCapital.map((letter, index) => (
          <StyledLetter key={index} onClick={() => handleClick(letter)}>
            {letter}
          </StyledLetter>
        ))}
      </StyledAlphabet>
    </Box>
  );
}

export default Alphabet;
