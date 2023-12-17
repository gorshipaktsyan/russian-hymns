import { useNavigate } from 'react-router-dom'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Divider, Fab, List, ListItem } from '@mui/material'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '500px'
})
const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px'
})
const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 5px',
  '&:hover': {
    backgroundColor: '#f0f0dc',
    cursor: 'pointer'
  }
})
const StyledText = styled(Box)({
  padding: '5px'
})
const StyledFab = styled(Fab)({
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'grey' }
})
function Bookmarks ({ setCurrentNumber }) {
  const SAVED = persistentStore.get('savedHymns') || []
  const SAVED_HYMNS = hymns.filter(h => SAVED.includes(h._id))
  const navigate = useNavigate()
  function handleClick (id) {
    setCurrentNumber(id)
    navigate('/russian-hymns')
  }
  function handleDelete (id) {
    const REMOVED_HYMN = SAVED_HYMNS.find(h => h._id === id)
    console.log(REMOVED_HYMN._id)
    persistentStore.remove('savedHymns', REMOVED_HYMN._id)
  }
  return (
    <StyledBox>
      <StyledList sx={{ maxWidth: '500px', width: '100%' }}>
        {SAVED_HYMNS.map(h => (
          <>
            <StyledListItem key={h._id} onClick={() => handleClick(h._id)}>
              <StyledText>{h?.first_string}</StyledText>
              <StyledText>{h?.number}</StyledText>
            </StyledListItem>
            <StyledFab
              color='primary'
              aria-label='add'
              onClick={() => handleDelete(h._id)}
            >
              <DeleteIcon />
            </StyledFab>
            <Divider />
          </>
        ))}
      </StyledList>
    </StyledBox>
  )
}

export default Bookmarks
