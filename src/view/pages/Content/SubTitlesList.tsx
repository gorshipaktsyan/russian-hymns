import { Box } from '@mui/material';

import { setSubtitleId } from '../../../redux/slice/contentSlice';
import { hymnsService, subtitlesService } from '../../../services';
import ListItem from '../../components/ListItem';

import FirstStringList from './FirstStringList';
import StyledContentComponents from './styles';
import { AppDispatch } from '../../../redux/store';

interface SubTitlesList {
  titleId: number;
  subtitleId: number | null;
  dispatch: AppDispatch;
  scrollToContentTittle: Function;
}
const { StyledSubList } = StyledContentComponents;

function SubTitlesList({ titleId, subtitleId, dispatch, scrollToContentTittle }: SubTitlesList) {
  const filteredSubtitles = subtitlesService.filterSubsByTitleId(titleId);

  function handleSubTitleClick(id: number) {
    dispatch(setSubtitleId(subtitleId === id ? null : id));
    scrollToContentTittle(id);
  }

  return (
    <StyledSubList>
      {filteredSubtitles.map((sub, index) => {
        return (
          <Box key={sub._id}>
            <ListItem
              title={sub.name_upper}
              id={sub._id}
              list={filteredSubtitles}
              index={index}
              onTitleClick={handleSubTitleClick}
              style={{
                fontWeight: subtitleId === sub._id ? 'bold' : undefined,
                fontSize: '15px'
              }}
            />
            {subtitleId === sub._id && (
              <FirstStringList hymnsService={hymnsService} subId={sub._id} dispatch={dispatch} />
            )}
          </Box>
        );
      })}
    </StyledSubList>
  );
}

export default SubTitlesList;
