import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitlesList from "./TitlesList";
import SubTitlesList from "./SubTitlesList";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox } = StyledComponents;
function Content({ setCurrentNumber }) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const navigate = useNavigate();

  function handleTitleClick(id) {
    setSelectedTitle(id);
  }

  function handleHymnClick(id) {
    setCurrentNumber([id]);
    navigate("/");
  }

  return (
    <StyledBox>
      {selectedTitle ? (
        <SubTitlesList
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
          handleHymnClick={handleHymnClick}
        />
      ) : (
        <TitlesList handleTitleClick={handleTitleClick} />
      )}
    </StyledBox>
  );
}

export default Content;
