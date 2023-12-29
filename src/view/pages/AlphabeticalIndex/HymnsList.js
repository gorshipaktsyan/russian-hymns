import { List, Divider, Box } from '@mui/material'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/ArrowBack'
import styled from '@emotion/styled'
import './index.scss'

const StyledBox = styled(Box)({
  width: '100%',
  maxWidth: '400px'
})
const StyledList = styled(List)({
  paddingBottom: '100px'
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
        {filteredHymns.map(h => (
          <HymnTitle
            title={h.first_string}
            number={h.number}
            id={h._id}
            BorderBottom={Divider}
            onTitleClick={handleTitleClick}
          />
        ))}
      </StyledList>
      <StyledFab color='primary' aria-label='add' onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  )
}

export default HymnsList
