import { List, ListItem, Divider, Box } from '@mui/material'
import styled from '@emotion/styled'
import titles from '../../services/storage/titles.json'
import './index.scss'

const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px',
  maxWidth: '400px'
})
const StyledListItem = styled(ListItem)({
  '&:hover': {
    backgroundColor: '#f0f0dc',
    cursor: 'pointer'
  }
})
function TitlesList ({ handleTitleClick }) {
  return (
    <StyledList>
      {titles.map(title => (
        <>
          <StyledListItem
            key={title._id}
            onClick={() => handleTitleClick(title)}
          >
            <Box>{title.name}</Box>
          </StyledListItem>
          <Divider />
        </>
      ))}
    </StyledList>
  )
}

export default TitlesList
