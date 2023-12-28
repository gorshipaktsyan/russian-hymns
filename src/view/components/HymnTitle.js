import styled from '@emotion/styled'
import { Box, ListItem, Icon } from '@mui/material'

const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 5px',
  '&:hover': {
    backgroundColor: '#f0f0dc',
    cursor: 'pointer'
  }
})
const StyledIcon = styled(Icon)({
  '&:hover': { color: 'grey', cursor: 'pointer' }
})
const StyledText = styled(Box)({
  padding: '5px'
})
function HymnTitle ({
  title,
  number,
  id,
  Icon,
  BorderBottom,
  iconClick,
  onTitleClick
}) {
  return (
    <>
      <Box
        key={id}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <StyledListItem>
          <StyledText onClick={() => onTitleClick(id)}>{title}</StyledText>
          <StyledText>{number}</StyledText>
        </StyledListItem>
        {Icon && <StyledIcon as={Icon} onClick={() => iconClick(id)} />}
      </Box>
      {BorderBottom && <BorderBottom />}
    </>
  )
}
export default HymnTitle
