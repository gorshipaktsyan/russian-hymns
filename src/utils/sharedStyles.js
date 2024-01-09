import { styled } from '@mui/system'
import {
  Box,
  List,
  ListItem,
  TextField,
  Button,
  Fab,
  Icon,
  Typography,
  Divider,
  Alert
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RightArrow from '@mui/icons-material/East'

const StyledComponents = {
  StyledBox: styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }),
  StyledList: styled(List)({
    width: '100%',
    paddingBottom: '100px',
    maxWidth: '400px'
  }),
  StyledAlphabet: styled(List)({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    paddingBottom: '100px',
    maxWidth: '400px'
  }),
  StyledListItem: styled(ListItem)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px',
    '&:hover': {
      backgroundColor: '#f0f0dc',
      cursor: 'pointer'
    }
  }),
  StyledLetter: styled(ListItem)({
    fontSize: '25px',
    width: '50px',
    height: '50px',
    display: 'flex',
    '&:hover': {
      backgroundColor: '#f0f0dc',
      cursor: 'pointer'
    }
  }),
  StyledTextField: styled(TextField)({
    width: '100%',
    maxWidth: '300px',
    marginTop: '10px',
    '& input': {
      '-webkit-appearance': 'none',
      margin: '0'
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0'
    }
  }),
  StyledText: styled(Box)({
    padding: '5px'
  }),
  StyledOpenButton: styled(Button)({
    border: '1px solid',
    width: '150px',
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0dc'
    }
  }),
  StyledSearchButton: styled(Button)({
    width: '50%',
    maxWidth: '150px',
    height: '50px',
    background: 'black',
    marginTop: '20px',
    '&:hover': {
      background: 'grey'
    }
  }),
  StyledFab: styled(Fab)({
    zIndex: 1000,
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: 'black',
    '&:hover': { backgroundColor: 'black' }
  }),
  StyledDeletedIcon: styled(Icon)({
    marginRight: '10px',
    '&:hover': { color: 'grey', cursor: 'pointer' }
  }),
  StyledTypography: styled(Typography)({
    marginTop: '100px'
  }),
  StyledDivider: styled(Divider)({
    width: '400px',
    margin: '0 auto'
  }),
  StyledModalBox: styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: '#fdfde8',
    border: '2px solid #000',
    boxShadow: '0px 0px 20px 5px ',
    padding: '4px'
  }),
  StyledModalList: styled(List)({
    width: '100%',
    paddingBottom: '100px',
    maxWidth: '400px',
    overflowY: 'auto',
    height: '90vh'
  }),
  StyledForm: styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '5%'
  }),
  SearchedBox: styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }),
  DesktopStyledTextField: styled(TextField)({
    maxWidth: '300px',
    backgroundColor: '#f1f1e0',
    borderRadius: '30px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '30px'
    },
    '& input': {
      '-webkit-appearance': 'none',
      margin: '0',
      padding: '0px 8px',
      fontSize: '20px'
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0'
    }
  }),
  MobileStyledTextField: styled(TextField)({
    position: 'fixed',
    bottom: '29px',
    right: '30px',
    width: '80%',
    maxWidth: '500px',
    border: '1px solid black',
    borderRadius: '30px',
    backgroundColor: '#f1f1e0',
    transition: 'width 0.5s',
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '30px'
    },
    '& input': {
      '-webkit-appearance': 'none',
      margin: '0'
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0'
    }
  }),
  StyledSearchIcon: styled(SearchIcon)({
    fontSize: '30px',
    marginLeft: '10px',
    cursor: 'pointer'
  }),
  StyledRightArrowIcon: styled(RightArrow)({
    fontSize: '30px',
    marginLeft: '10px',
    cursor: 'pointer'
  }),
  StyledApp: styled(Box)({
    minHeight: '100vh',
    backgroundColor: '#fdfde8',
    paddingTop: '64px'
  }),
  StyledAlert: styled(Alert)({
    width: '100%',
    marginTop: '50px'
  })
}

export default StyledComponents
