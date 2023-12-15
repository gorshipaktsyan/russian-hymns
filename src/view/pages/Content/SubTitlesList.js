import { useState } from 'react'
import hymns from '../../services/storage/hymns.json'
import Subtitles from '../../services/storage/subtitles.json'
import { Divider, Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/ArrowBack'
import styled from '@emotion/styled'
import './index.scss'

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: ' #f0f0dc',
    cursor: 'pointer'
  }
})
const StyledText = styled(Box)({
  padding: '5px'
})
const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  backgroundColor: 'black',
  '&:hover': { backgroundColor: 'grey' }
})

function SubTitlesList ({ selectedTitle, setSelectedTitle, handleHymnClick }) {
  const [expanded, setExpanded] = useState(false)
  const grouped = hymns.filter(hymn => hymn.title === selectedTitle)
  const subtitles = Subtitles.filter(sub => sub.title === selectedTitle)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleBackClick = () => {
    setExpanded(false)
    setSelectedTitle(null)
  }

  return (
    <Box>
      {subtitles.map(subtitle => {
        const hymns = grouped.filter(h => h.subtitle === subtitle._id)
        return (
          <Accordion
            key={subtitle._id}
            expanded={expanded === subtitle._id}
            onChange={handleChange(subtitle._id)}
            sx={{ backgroundColor: '#ffffe7' }}
          >
            <AccordionSummary
              sx={{ marginBottom: '0px' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography key={subtitle._id}>{subtitle.name_upper}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hymns.map(h => (
                <>
                  <StyledBox key={h._id} onClick={() => handleHymnClick(h)}>
                    <StyledText>{h.first_string}</StyledText>
                    <StyledText>{h.number}</StyledText>
                  </StyledBox>
                  <Divider />
                </>
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
      <StyledFab color='primary' aria-label='add' onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </Box>
  )
}

export default SubTitlesList
