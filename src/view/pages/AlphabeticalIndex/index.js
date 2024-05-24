import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import StyledComponents from "../../../utils/sharedStyles";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import { setAppBarTitle } from "../../../redux/slice/appBarSlice";

const { StyledBox } = StyledComponents;

function AlphabeticalIndex() {
  const lg = useSelector((state) => state.settings.language);
  const [letter, setLetter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTitleClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  function handleBackClick() {
    setLetter("");
    dispatch(setAppBarTitle(lg.alphabeticalIndex.alphabeticalIndex));
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
        <Alphabet
          setLetter={setLetter}
          dispatch={dispatch}
          lg={lg}
          setAppBarTitle={setAppBarTitle}
        />
      )}
    </StyledBox>
  );
}

export default AlphabeticalIndex;
