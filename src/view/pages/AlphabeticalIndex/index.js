import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAppBarTitle } from '../../../redux/slice/appBarSlice';
import { setCurrentNumber } from '../../../redux/slice/currentNumberSlice';
import { StyledComponents } from '../../styles';

import Alphabet from './Alphabet';
import HymnsList from './HymnsList';

const { StyledBox } = StyledComponents;

function AlphabeticalIndex() {
  const lg = useSelector((state) => state.settings.language);
  const letter = useSelector((state) => state.alphabeticalIndex.letter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    letter && dispatch(setAppBarTitle(`${lg.alphabeticalIndex.alphabeticalIndex} (${letter})`));
  }, [letter]);

  function handleTitleClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledBox>
      {letter ? (
        <HymnsList lg={lg} letter={letter} handleTitleClick={handleTitleClick} />
      ) : (
        <Alphabet dispatch={dispatch} lg={lg} />
      )}
    </StyledBox>
  );
}

export default AlphabeticalIndex;
