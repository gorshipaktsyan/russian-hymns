import { useNavigate } from 'react-router-dom';

import { setCurrentHymns } from '../../../redux/slice/currentHymnsSlice';
import ListItem from '../../components/ListItem';

import StyledContentComponents from './styles';
import { AppDispatch } from '../../../redux/store';
import { HymnType } from '../../../types';

interface FirstStringList {
  subId: number
  dispatch: AppDispatch
  hymnsService: any
}

const { StyledFirstStringList } = StyledContentComponents;

export default function FirstStringList({ subId, dispatch, hymnsService }: FirstStringList) {
  const navigate = useNavigate();
  const firstStringList = hymnsService.filterHymnsBySubId(subId);

  function handleHymnClick(id: number) {
    dispatch(setCurrentHymns([id]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledFirstStringList>
      {firstStringList.map((h: HymnType, index: number) => (
        <ListItem
          key={h._id}
          title={h.first_string}
          number={h.number}
          id={h._id}
          list={firstStringList}
          index={index}
          onTitleClick={handleHymnClick}
          style={{
            fontSize: '15px'
          }}
        />
      ))}
    </StyledFirstStringList>
  );
}
