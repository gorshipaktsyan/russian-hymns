import React from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledFab, StyledList, StyledBox } = StyledComponents;

function HymnList({
  setOpenHymnList,
  findedHymns,
  setCurrentNumber,
  navigate,
}) {
  function handleClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }
  const handleBackClick = () => {
    setOpenHymnList(false);
  };
  return (
    <StyledBox>
      <StyledList>
        {findedHymns.map((h, index) => (
          <HymnTitle
            title={h?.first_string}
            number={h.number}
            id={h.number}
            hymnsList={findedHymns}
            index={index}
            BorderBottom={Divider}
            onTitleClick={handleClick}
          />
        ))}
        <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
          <CloseIcon />
        </StyledFab>
      </StyledList>
    </StyledBox>
  );
}
export default HymnList;
