import React, { useMemo } from 'react'
import HymnTitle from '../../components/HymnTitle'
import { useNavigate } from 'react-router-dom'
import { Box, Collapse, Divider, List } from '@mui/material'
import styled from '@emotion/styled'
import { TransitionGroup } from 'react-transition-group'
import historyStore from '../../services/HistoryStore'

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

function History ({ setCurrentNumber }) {
  const navigate = useNavigate()

  const groupedHymns = useMemo(() => {
    return historyStore.get('searchedHymns')
  }, [])

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
