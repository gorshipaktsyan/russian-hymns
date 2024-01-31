import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import historyStore from "../../services/HistoryStore";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox } = StyledComponents;

function AlphabeticalIndex({ setCurrentNumber, setTitle }) {
  const [letter, setLetter] = useState("");
  const navigate = useNavigate();

  function handleTitleClick(id) {
    const hymnIds = historyStore.set("searchedHymns", id);
    setCurrentNumber(hymnIds);
    navigate("/");
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
