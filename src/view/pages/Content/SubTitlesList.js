import { useState, useMemo } from 'react'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import Subtitles from '../../services/storage/subtitles.json'
import { Divider } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/ArrowBack'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledList, StyledFab } = StyledComponents

function SubTitlesList ({ selectedTitle, setSelectedTitle, handleHymnClick }) {
  const [expanded, setExpanded] = useState(false)
  const grouped = useMemo(() => {
    return hymns.filter(hymn => hymn.title === selectedTitle)
  }, [selectedTitle])
  const subtitles = useMemo(() => {
    return Subtitles.filter(sub => sub.title === selectedTitle)
  }, [selectedTitle])

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleBackClick = () => {
    setExpanded(false)
    setSelectedTitle(null)
  }

  return (
    <StyledList>
      {subtitles.map(subtitle => {
        const hymns = grouped.filter(h => h.subtitle === subtitle._id)
        return (
          <Accordion
            key={subtitle._id}
            expanded={expanded === subtitle._id}
            onChange={handleChange(subtitle._id)}
          >
            <AccordionSummary
              sx={{ marginBottom: '0px' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography key={subtitle._id}>{subtitle.name_upper}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hymns.map((h, index) => (
                <HymnTitle
                  title={h.first_string}
                  number={h.number}
                  id={h._id}
                  hymnsList={hymns}
                  index={index}
                  BorderBottom={Divider}
                  onTitleClick={handleHymnClick}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
      <StyledFab color='primary' aria-label='add' onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledList>
  )
}

export default SubTitlesList
