import ListItem from '../../components/ListItem';
import { setSubtitleId } from '../../../redux/slice/contentSlice';
import FirstStringList from './FirstStringList';
import { Box } from '@mui/material';
import StyledContentComponents from './styles';
import { subtitlesService, hymnsService } from '../../../services';

const { StyledSubList } = StyledContentComponents;

function SubTitlesList({ titleId, subtitleId, dispatch, scrollToContentTittle }) {
  const filteredSubtitles = subtitlesService.filterSubsByTitleId(titleId);

  function handleSubTitleClick(id) {
    dispatch(setSubtitleId(subtitleId === id ? '' : id));
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
                fontWeight: subtitleId === sub._id && 'bold',
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
