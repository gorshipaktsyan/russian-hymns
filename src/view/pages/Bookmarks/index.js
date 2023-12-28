import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HymnTitle from '../../components/HymnTitle'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import { Box, Divider, List, Typography } from '@mui/material'
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
function Bookmarks ({ setCurrentNumber }) {
  const SAVED = persistentStore.get('savedHymns') || []
  const savedHymnsData = hymns.filter(h => SAVED.includes(h._id))
  const navigate = useNavigate()
  const [savedHymns, setSavedHymns] = useState(savedHymnsData)

  function handleClick (id) {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const hymnObject = { number: [id], date: currentDate }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', updatedHymns)
    setCurrentNumber([id])
    navigate('/russian-hymns')
  }
  function handleDelete (id) {
    persistentStore.remove('savedHymns', id)
    const updatedHymns = savedHymns.filter(h => h._id !== id)
    setSavedHymns(updatedHymns)
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
                  Icon={DeleteIcon}
                  BorderBottom={Divider}
                  onTitleClick={handleClick}
                  iconClick={handleDelete}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </StyledList>
      ) : (
        <StyledTypography>Нет данных</StyledTypography>
      )}
    </StyledBox>
  )
}

export default Bookmarks
