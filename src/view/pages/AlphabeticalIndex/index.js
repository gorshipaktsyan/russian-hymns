import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox } = StyledComponents;

function AlphabeticalIndex({ setCurrentNumber, setTitle }) {
  const [letter, setLetter] = useState("");
  const navigate = useNavigate();

  function handleTitleClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }
  function handleBackClick() {
    setLetter("");
    setTitle("Алфавитный указатель");
  }
  return (
    <StyledBox>
      {letter ? (
        <HymnsList
          letter={letter}
          handleTitleClick={handleTitleClick}
          handleBackClick={() => handleBackClick()}
        />
      ) : (
        <Alphabet setLetter={setLetter} setTitle={setTitle} />
      )}
    </StyledBox>
  );
}

export default AlphabeticalIndex;
