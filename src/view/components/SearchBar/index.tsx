import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';

import { setFoundHymns } from '../../../redux/slice/searchSlice';
import { StyledComponents } from '../../styles';

import SearchBarStyledComponents from './styles';
import { AppDispatch, RootState } from '../../../redux/store';

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const isMobile = useSelector((state: RootState) => state.settings.isMobile);

  function handleClick() {
    navigate('/');
    dispatch(setFoundHymns([]));
  }

  return (
    <>
      {!isMobile ? (
        <SearchedBox>
          <StyledSearchIcon onClick={handleClick} />
        </SearchedBox>
      ) : (
        <StyledFab color="primary" aria-label="add" onClick={handleClick}>
          <SearchIcon />
        </StyledFab>
      )}
    </>
  );
}

export default SearchBar;
