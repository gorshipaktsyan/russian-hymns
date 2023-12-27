import React from 'react'
import hymns from '../../services/storage/hymns.json'
import Snackbar from '@mui/material/Snackbar'
import persistentStore from '../../services/PersistentStore'
import {
  Alert,
  Box,
  Divider,
  Fab,
  List,
  ListItem,
  Modal,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const StyledBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: '#fdfde8',
  border: '2px solid #000',
  boxShadow: '0px 0px 20px 5px ',
  padding: '4px'
})
const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 220)',
    cursor: 'pointer'
  }
})
const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '20px',
  right: '30px',
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'grey' }
})

function HymnList ({
  openHymnList,
  setOpenHymnList,
  searchedText,
  setCurrentNumber,
  navigate
}) {
  const hymnsByText = hymns.filter(h => h.text.includes(searchedText))
  const handleClose = () => setOpenHymnList(false)

  function handleClick (id) {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const HYMN_OBJECT = { number: [id], date: currentDate }
    const UPDATED_HYMNS = [...new Set([HYMN_OBJECT, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    setCurrentNumber([id])
    navigate('/russian-hymns')
  }
  const handleBackClick = () => {
    setOpenHymnList(false)
  }
  return hymnsByText.length > 0 ? (
    <div>
      <Modal
        open={openHymnList}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <StyledBox>
          <List sx={{ overflowY: 'auto', height: '100vh' }}>
            {hymnsByText.map(h => (
              <>
                <StyledListItem
                  key={h?._id}
                  onClick={() => handleClick(h?._id)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <Box>{h?.first_string}</Box>
                    <Box>{h?.number}</Box>
                  </Box>
                </StyledListItem>
                <Divider />
              </>
            ))}
            <StyledFab
              color='primary'
              aria-label='add'
              onClick={handleBackClick}
            >
              <CloseIcon />
            </StyledFab>
          </List>
        </StyledBox>
      </Modal>
    </div>
  ) : (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={openHymnList}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity='error'
        sx={{ width: '100%', marginTop: '50px' }}
      >
        Соответствующие гимны не найдены!
      </Alert>
    </Snackbar>
  )
}
export default HymnList
