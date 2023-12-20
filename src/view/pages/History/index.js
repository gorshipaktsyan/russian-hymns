import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Collapse, Divider, List, ListItem } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import styled from '@emotion/styled'
import { TransitionGroup } from 'react-transition-group'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
})
const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px',
  maxWidth: '400px',
  padding: '5px'
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
function formattingDate (date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }
  const dateFormatter = new Intl.DateTimeFormat('ru', options)
  return dateFormatter.format(new Date(date))
}

function History ({ setCurrentNumber }) {
  const HISTORY = persistentStore.get('searchedNumbers') || []
  const navigate = useNavigate()
  const groupedHymns = {}

  HISTORY.forEach(searched => {
    const matchingHymn = hymns.find(h => h.number === searched.number)
    if (matchingHymn) {
      const formattedDate = formattingDate(searched.date)
      if (!groupedHymns[formattedDate]) {
        groupedHymns[formattedDate] = []
      }
      groupedHymns[formattedDate].push({
        ...matchingHymn,
        date: searched.date,
        formattedDate: formattedDate
      })
    }
  })
  const sortedEntries = Object.entries(groupedHymns).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
  )
  function handleClick (id) {
    setCurrentNumber(id)
    navigate('/russian-hymns')
  }
  console.log(sortedEntries)
  return (
    <StyledBox>
      <StyledList>
        <TransitionGroup>
          {sortedEntries.map(([date, hymns]) => (
            <Collapse key={date}>
              <Box sx={{ paddingBottom: '30px' }}>
                <Divider>{date}</Divider>
                {hymns.map(h => (
                  <>
                    <StyledListItem
                      key={h?._id}
                      onClick={() => handleClick(h?._id)}
                    >
                      <StyledText>{h?.first_string}</StyledText>
                      <StyledText>{h?.number}</StyledText>
                    </StyledListItem>
                    <Divider />
                  </>
                ))}
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
      </StyledList>
    </StyledBox>
  )
}

export default History
