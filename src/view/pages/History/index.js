import React, { useMemo } from 'react'
import HymnTitle from '../../components/hymnTitle/HymnTitle'
import { useNavigate } from 'react-router-dom'
import { Box, Collapse, Divider } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import historyStore from '../../services/HistoryStore'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledBox, StyledList,StyledTypography } = StyledComponents

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
      { groupedHymns.length > 0 ? 
     ( <StyledList>
        <TransitionGroup>
          {groupedHymns.map(({date, hymns}) => (
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
      </StyledList>)
       : (
        <StyledTypography>Нет данных</StyledTypography>
      )}
    </StyledBox>
  )
}

export default History
