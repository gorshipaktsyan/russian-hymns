import { Box, Checkbox } from '@mui/material'
import StyledComponents from '../../utils/sharedStyles'

const { StyledListItem, StyledDeletedIcon, StyledText } = StyledComponents

function addDivider (BorderBottom, hymnsList, index) {
  if (BorderBottom && index !== hymnsList.length - 1) {
    const lastIndex = hymnsList.length - 1
    return <BorderBottom key={lastIndex} />
  }
  return null
}

function HymnTitle ({
  title,
  number,
  id,
  hymnsList,
  index,
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
        <StyledListItem onClick={() => onTitleClick(id)}>
          <StyledText>{title}</StyledText>
          <StyledText>{number}</StyledText>
        </StyledListItem>
        {Icon && (
          <StyledDeletedIcon as={Icon} onClick={() => onIconClick(id)} />
        )}
      </Box>
      {addDivider(BorderBottom, hymnsList, index)}
    </>
  )
}
export default HymnTitle
