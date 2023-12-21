import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Divider, List, ListItem, Typography } from '@mui/material'
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
const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 5px',
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
const StyledTypography = styled(Typography)({
  marginTop: '100px'
})
function Bookmarks ({ setCurrentNumber }) {
  const SAVED = persistentStore.get('savedHymns') || []
  const savedHymnsData = hymns.filter(h => SAVED.includes(h._id))
  const navigate = useNavigate()
  const [savedHymns, setSavedHymns] = useState(savedHymnsData)

  function handleClick (id) {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const HYMN_OBJECT = { number: id, date: currentDate }
    const UPDATED_HYMNS = [...new Set([HYMN_OBJECT, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    setCurrentNumber([id])
    navigate('/russian-hymns')
  }
  function handleDelete (id) {
    persistentStore.remove('savedHymns', id)
    const UPDATED_HYMNS = savedHymns.filter(h => h._id !== id)
    setSavedHymns(UPDATED_HYMNS)
  }

  return (
    <StyledBox>
      {!!savedHymns.length ? (
        <StyledList sx={{ maxWidth: '500px', width: '100%' }}>
          <TransitionGroup>
            {savedHymns.map(h => (
              <Collapse>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '5px'
                  }}
                >
                  <StyledListItem
                    key={h._id}
                    onClick={() => handleClick(h._id)}
                  >
                    <StyledText>{h?.first_string}</StyledText>
                    <StyledText>{h?.number}</StyledText>
                  </StyledListItem>
                  <StyledDelIcon onClick={() => handleDelete(h._id)} />
                </Box>
                <Divider />
              </Collapse>
            ))}
          </TransitionGroup>
        </StyledList>
      ) : (
        <StyledTypography>No data</StyledTypography>
      )}
    </StyledBox>
  )
}

export default Bookmarks
