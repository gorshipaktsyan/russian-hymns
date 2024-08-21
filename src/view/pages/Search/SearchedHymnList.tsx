import { setCurrentHymns } from '../../../redux/slice/currentHymnsSlice';
import ListItem from '../../components/ListItem';
import { StyledComponents } from '../../styles';
import { AppDispatch } from '../../../redux/store';
import { HymnType } from '../../../types';
import { hymnsService } from '../../../services';
import { NavigateFunction } from 'react-router-dom';

interface SearchedHymnList {
  foundHymns: HymnType[]
  navigate: NavigateFunction
  dispatch: AppDispatch
}

const { StyledList, StyledBox } = StyledComponents;

function SearchedHymnList({ foundHymns, navigate, dispatch }: SearchedHymnList) {
  function handleClick(id: number) {
    const hymn = hymnsService.findHymn(id)
    if(hymn){
      dispatch(setCurrentHymns([hymn]));
    navigate(`/hymns/${id}`);
    }
    
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
