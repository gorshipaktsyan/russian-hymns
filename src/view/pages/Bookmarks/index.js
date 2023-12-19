import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Divider, List, ListItem } from '@mui/material'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'

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
const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 5px',
  '&:hover': {
    backgroundColor: '#f0f0dc',
    cursor: 'pointer'
  }
})
const StyledText = styled(Box)({
  padding: '5px'
})
const StyledDelIcon = styled(DeleteIcon)({
  '&:hover': { color: 'grey' }
})

function Bookmarks ({ setCurrentNumber }) {
  const navigate = useNavigate()
  const [savedHymns, setSavedHymns] = useState([])
  useEffect(() => {
    const SAVED = persistentStore.get('savedHymns') || []
    const savedHymnsData = hymns.filter(h => SAVED.includes(h._id))
    setSavedHymns(savedHymnsData)
  }, [savedHymns])
  function handleClick (id) {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const HYMN_OBJECT = { number: id, date: currentDate }
    const UPDATED_HYMNS = [...new Set([HYMN_OBJECT, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    setCurrentNumber(id)
    navigate('/russian-hymns')
  }
  function handleDelete (id) {
    persistentStore.remove('savedHymns', id)
    const UPDATED_HYMNS = savedHymns.filter(h => h._id !== id)
    setSavedHymns(UPDATED_HYMNS)
  }
  return (
    <StyledBox>
      <StyledList sx={{ maxWidth: '500px', width: '100%' }}>
        {savedHymns.map(h => (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '5px' }}>
              <StyledListItem key={h._id} onClick={() => handleClick(h._id)}>
                <StyledText>{h?.first_string}</StyledText>
                <StyledText>{h?.number}</StyledText>
              </StyledListItem>
              <StyledDelIcon onClick={() => handleDelete(h._id)} />
            </Box>
            <Divider />
          </>
        ))}
      </StyledList>
    </StyledBox>
  )
}

export default Bookmarks
