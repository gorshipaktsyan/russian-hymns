import React from 'react';
import ListItem from '../../components/ListItem';
import { StyledComponents } from '../../styles';
import { setCurrentNumber } from '../../../redux/slice/currentNumberSlice';
import { setFoundHymns } from '../../../redux/slice/searchSlice';

const { StyledList, StyledBox } = StyledComponents;

function SearchedHymnList({ foundHymns, navigate, dispatch }) {
  function handleClick(id) {
    dispatch(setCurrentNumber([id]));
    dispatch(setFoundHymns([]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledBox>
      <StyledList>
        {foundHymns.map((h, index) => (
          <ListItem
            key={h.number}
            title={h?.first_string}
            number={h.number}
            id={h.number}
            list={foundHymns}
            index={index}
            onTitleClick={handleClick}
          />
        ))}
      </StyledList>
    </StyledBox>
  );
}
export default SearchedHymnList;
