import React from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Divider } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import actions from "../../../redux/actions/actions";

const { StyledList, StyledBox } = StyledComponents;

function HymnList({ findedHymns, navigate, dispatch }) {
  function handleClick(id) {
    dispatch({ typr: actions.SET_CURRENT_NUMBER, payload: [id] });
    navigate(`/hymns/${id}`);
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
