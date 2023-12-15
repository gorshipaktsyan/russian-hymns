import { useNavigate } from 'react-router-dom'
import { Box, Divider, List, ListItem } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import styled from '@emotion/styled'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center'
})
const StyledList = styled(List)({
  width: '100%',
  maxWidth: '500px'
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

function Bookmarks ({ setCurrentNumber }) {
  const SAVED = persistentStore.get('savedHymns') || []
  const SAVED_HYMNS = hymns.filter(h => SAVED.includes(h._id))
  const navigate = useNavigate()

  function handleClick (id) {
    setCurrentNumber(id)
    navigate('/russian-hymns')
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
            <Divider />
          </>
        ))}
      </StyledList>
    </StyledBox>
  )
}

export default Bookmarks
