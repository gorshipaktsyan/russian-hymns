import React from 'react'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import Snackbar from '@mui/material/Snackbar'
import persistentStore from '../../services/PersistentStore'
import { Alert, Box, Divider, Fab, List, Modal, styled } from '@mui/material'
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
const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px',
  maxWidth: '400px',
  overflowY: 'auto',
  height: '90vh'
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
          <StyledList>
            {hymnsByText.map(h => (
              <HymnTitle
                title={h?.first_string}
                number={h.number}
                id={h.number}
                BorderBottom={Divider}
                onTitleClick={handleClick}
              />
            ))}
            <StyledFab
              color='primary'
              aria-label='add'
              onClick={handleBackClick}
            >
              <CloseIcon />
            </StyledFab>
          </StyledList>
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
