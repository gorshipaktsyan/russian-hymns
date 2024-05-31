import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';

import { setIsSearchedHymnsListOpen } from '../../../redux/slice/searchSlice';
import { StyledComponents } from '../../styles';

import SearchBarStyledComponents from './styles';

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar({ dispatch }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.settings.isMobile);

  function handleClick() {
    dispatch(setIsSearchedHymnsListOpen(false));
    navigate('/');
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
