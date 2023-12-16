import { List, ListItem, Divider, Box } from '@mui/material'
import hymns from '../../services/storage/hymns.json'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/ArrowBack'
import styled from '@emotion/styled'
import './index.scss'

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
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'grey' }
})

function HymnsList ({ handleTitleClick, letter, handleBackClick }) {
  const filteredHymns = hymns.filter(h => h.first_letter === letter)
  return (
    <StyledBox>
      <StyledList>
        {filteredHymns.map(hymn => (
          <>
            <StyledListItem
              key={hymn?._id}
              onClick={() => handleTitleClick(hymn)}
            >
              <StyledText>{hymn.first_string}</StyledText>
              <StyledText>{hymn.number}</StyledText>
            </StyledListItem>
            <Divider />
          </>
        ))}
      </StyledList>
      <StyledFab color='primary' aria-label='add' onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  )
}

export default HymnsList
