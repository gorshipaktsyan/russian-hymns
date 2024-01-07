import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import HymnTitle from '../../components/HymnTitle'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Button, Divider, List, Typography } from '@mui/material'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import historyStore from '../../services/HistoryStore'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
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
  const savedHymnsData = useMemo(() => {
    const saved = persistentStore.get('savedHymns') || []
    return hymns.filter(h => saved.includes(h._id))
  }, [])

  const [savedHymns, setSavedHymns] = useState(savedHymnsData)
  const [selectedHymns, setSelectedHymns] = useState([])
  const navigate = useNavigate()

  function handleClick (ids) {
    const hymnIds = historyStore.set('searchedHymns', ids)
    setCurrentNumber(hymnIds)
    navigate('/russian-hymns')
  }

  function handleDelete (id) {
    persistentStore.remove('savedHymns', id)
    const updatedHymns = savedHymns.filter(h => h._id !== id)
    setSelectedHymns(selectedHymns.filter(n => n !== id))
    setSavedHymns(updatedHymns)
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
            {savedHymns.map((h, index) => (
              <Collapse key={h._id || index}>
                <HymnTitle
                  title={h?.first_string}
                  number={h?.number}
                  id={h._id}
                  hymnsList={savedHymns}
                  index={index}
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
