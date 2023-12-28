import styled from '@emotion/styled'
import { Box, ListItem, Icon, Checkbox } from '@mui/material'

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
  selectedHymns,
  Icon,
  BorderBottom,
  onCheckBoxClick,
  onIconClick,
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
        {onCheckBoxClick && (
          <Checkbox
            onChange={() => onCheckBoxClick(id)}
            checked={selectedHymns.includes(id)}
            color='default'
          />
        )}
        <StyledListItem>
          <StyledText onClick={() => onTitleClick(id)}>{title}</StyledText>
          <StyledText>{number}</StyledText>
        </StyledListItem>
        {Icon && <StyledIcon as={Icon} onClick={() => onIconClick(id)} />}
      </Box>
      {BorderBottom && <BorderBottom />}
    </>
  )
}
export default HymnTitle
