import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import StyledComponents from "../../../utils/sharedStyles";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions/actions";

const { StyledBox } = StyledComponents;

function AlphabeticalIndex() {
  const lg = useSelector((state) => state.hymns.language);
  const [letter, setLetter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTitleClick(id) {
    dispatch({
      type: actions.SET_CURRENT_NUMBER,
      payload: [id],
    });
    navigate(`/hymns/${id}`);
  }
  function handleBackClick() {
    setLetter("");
    dispatch({
      type: actions.SET_TITLE,
      payload: lg.alphabeticalIndex.alphabeticalIndex,
    });
  }
  return (
    <StyledBox>
      {letter ? (
        <HymnsList
          lg={lg}
          letter={letter}
          handleTitleClick={handleTitleClick}
          handleBackClick={() => handleBackClick()}
        />
      ) : (
        <Alphabet setLetter={setLetter} dispatch={dispatch} lg={lg} />
      )}
    </StyledBox>
  );
}

export default AlphabeticalIndex;
