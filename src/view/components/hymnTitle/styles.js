import styled from '@emotion/styled'
import { Box, Icon, ListItem } from '@mui/material'

const HymnTitleStyledComponents = {
  StyledListItem: styled(ListItem)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px',
    '&:hover': {
      backgroundColor: '#f0f0dc',
      cursor: 'pointer'
    }
  }),
  StyledDeletedIcon: styled(Icon)({
    marginRight: '10px',
    '&:hover': { color: 'grey', cursor: 'pointer' }
  }),
  StyledText: styled(Box)({
    padding: '5px'
  })
}

export default HymnTitleStyledComponents
