import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import StyledComponents from "../../../utils/sharedStyles";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions/actions";

const { StyledBox } = StyledComponents;

function AlphabeticalIndex({ language, setCurrentNumber }) {
  const [letter, setLetter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTitleClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }
  function handleBackClick() {
    setLetter("");
    dispatch({
      type: actions.SET_TITLE,
      payload: language.alphabeticalIndex.alphabeticalIndex,
    });
  }
  return (
    <StyledBox>
      {letter ? (
        <HymnsList
          language={language}
          letter={letter}
          handleTitleClick={handleTitleClick}
          handleBackClick={() => handleBackClick()}
        />
      ) : (
        <Alphabet
          setLetter={setLetter}
          dispatch={dispatch}
          language={language}
        />
      )}
    </StyledBox>
  );
}

export default AlphabeticalIndex;
