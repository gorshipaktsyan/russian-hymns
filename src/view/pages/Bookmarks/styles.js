import styled from '@emotion/styled'
import { Typography, Button } from '@mui/material'

const BookmarksStyledComponents = {
  StyledTypography: styled(Typography)({
    marginTop: '100px'
  }),
  StyledOpenButton: styled(Button)({
    border: '1px solid',
    width: '150px',
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0dc'
    }
  })
}

export default BookmarksStyledComponents
