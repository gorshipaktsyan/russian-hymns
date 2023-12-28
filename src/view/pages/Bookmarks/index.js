import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HymnTitle from '../../components/HymnTitle'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Button, Checkbox, Divider, List, Typography } from '@mui/material'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
})
const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px',
  maxWidth: '400px'
})
const StyledTypography = styled(Typography)({
  marginTop: '100px'
})
const StyledButton = styled(Button)({
  border: '1px solid',
  width: '150px',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f0f0dc'
  }
})
function Bookmarks ({ setCurrentNumber }) {
  const SAVED = persistentStore.get('savedHymns') || []
  const savedHymnsData = hymns.filter(h => SAVED.includes(h._id))
  const navigate = useNavigate()
  const [savedHymns, setSavedHymns] = useState(savedHymnsData)
  const [selectedHymns, setSelectedHymns] = useState([])

  function handleClick (ids) {
    const hymnIds = Array.isArray(ids) ? ids : [ids]
    console.log(hymnIds)
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const hymnObject = { number: hymnIds, date: currentDate }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', updatedHymns)
    setCurrentNumber(hymnIds)
    navigate('/russian-hymns')
  }

  function handleDelete (ids) {
    const hymnIds = Array.isArray(ids) ? ids : [ids]
    persistentStore.remove('savedHymns', hymnIds)
    const updatedHymns = savedHymns.filter(h => !selectedHymns.includes(h._id))
    setSavedHymns(updatedHymns)
    setSelectedHymns([])
  }
  const handleCheckboxChange = id => {
    setSelectedHymns(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    )
  }
  return (
    <StyledBox>
      {!!savedHymns.length ? (
        <StyledList sx={{ maxWidth: '500px', width: '100%' }}>
          <TransitionGroup>
            {savedHymns.map(h => (
              <Collapse>
                <HymnTitle
                  title={h?.first_string}
                  number={h?.number}
                  id={h._id}
                  selectedHymns={selectedHymns}
                  Icon={DeleteIcon}
                  BorderBottom={Divider}
                  onCheckBoxClick={handleCheckboxChange}
                  onTitleClick={handleClick}
                  onIconClick={handleDelete}
                />
              </Collapse>
            ))}
          </TransitionGroup>
          {selectedHymns.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <StyledButton onClick={() => handleClick(selectedHymns)}>
                Открыть
              </StyledButton>
              <StyledButton onClick={() => handleDelete(selectedHymns)}>
                Удалить
              </StyledButton>
            </Box>
          )}
        </StyledList>
      ) : (
        <StyledTypography>Нет данных</StyledTypography>
      )}
    </StyledBox>
  )
}

export default Bookmarks
