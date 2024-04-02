import React from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Divider } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledList, StyledBox } = StyledComponents;

function HymnList({ findedHymns, setCurrentNumber, navigate }) {
  function handleClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }
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
      </StyledList>
    </StyledBox>
  );
}
export default HymnList;
