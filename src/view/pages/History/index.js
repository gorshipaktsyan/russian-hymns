import React from 'react'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import { useNavigate } from 'react-router-dom'
import { Box, Collapse, Divider, List } from '@mui/material'
import persistentStore from '../../services/PersistentStore'
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
  maxWidth: '400px'
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
  const history = persistentStore.get('searchedNumbers') || []
  const navigate = useNavigate()
  const groupedHymns = {}

  history.forEach(searched => {
    searched.number.forEach(number => {
      const matchingHymn = hymns.find(h => h.number === number)
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
  })
  function handleClick (id) {
    setCurrentNumber([id])
    navigate('/russian-hymns')
  }
  return (
    <StyledBox>
      <StyledList>
        <TransitionGroup>
          {Object.entries(groupedHymns).map(([date, hymns]) => (
            <Collapse key={date}>
              <Box sx={{ paddingBottom: '20px' }}>
                <Divider>{date}</Divider>
                {hymns.map((h, index) => (
                  <HymnTitle
                    title={h?.first_string}
                    number={h?.number}
                    id={h._id}
                    hymnsList={hymns}
                    index={index}
                    BorderBottom={Divider}
                    onTitleClick={handleClick}
                  />
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
