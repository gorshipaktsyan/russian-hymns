import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Divider, List, ListItem } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
import hymns from '../../services/storage/hymns.json'
import styled from '@emotion/styled'

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
function formattingDate (date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }
  const dateFormatter = new Intl.DateTimeFormat('ru', options)
  const formattedDate = dateFormatter.format(new Date(date))

  return formattedDate
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

  function handleClick (id) {
    setCurrentNumber(id)
    navigate('/russian-hymns')
  }
  console.log(groupedHymns)
  return (
    <StyledBox>
      <StyledList>
        {Object.entries(groupedHymns).map(([date, hymns]) => (
          <Box key={date} sx={{ paddingBottom: '30px' }}>
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
        ))}
      </StyledList>
    </StyledBox>
  )
}

export default History
