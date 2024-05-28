import React from "react";
import ListItem from "../../components/ListItem";
import { Divider } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import { setFindedHymns } from "../../../redux/slice/searchSlice";

const { StyledList, StyledBox } = StyledComponents;

function SearchedHymnList({ findedHymns, navigate, dispatch }) {
  function handleClick(id) {
    dispatch(setCurrentNumber([id]));
    dispatch(setFindedHymns([]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledBox>
      <StyledList>
        {findedHymns.map((h, index) => (
          <ListItem
            key={h.number}
            title={h?.first_string}
            number={h.number}
            id={h.number}
            list={findedHymns}
            index={index}
            BorderBottom={Divider}
            onTitleClick={handleClick}
          />
        ))}
      </StyledList>
    </StyledBox>
  );
}
export default SearchedHymnList;
