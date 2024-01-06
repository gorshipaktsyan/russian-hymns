import React from 'react'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import Snackbar from '@mui/material/Snackbar'
import { Alert, Divider, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import historyStore from '../../services/HistoryStore'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledModalBox, StyledModalList, StyledFab } = StyledComponents

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
    const hymnIds = historyStore.set('searchedHymns', id)
    setCurrentNumber(hymnIds)
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
        <StyledModalBox>
          <StyledModalList>
            {hymnsByText.map((h, index) => (
              <HymnTitle
                title={h?.first_string}
                number={h.number}
                id={h.number}
                hymnsList={hymnsByText}
                index={index}
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
          </StyledModalList>
        </StyledModalBox>
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
