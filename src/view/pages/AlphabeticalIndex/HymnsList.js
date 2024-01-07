import { useMemo } from 'react'
import { Divider } from '@mui/material'
import HymnTitle from '../../components/HymnTitle'
import hymns from '../../services/storage/hymns.json'
import AddIcon from '@mui/icons-material/ArrowBack'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledBox, StyledList, StyledFab } = StyledComponents

function HymnsList ({ handleTitleClick, letter, handleBackClick }) {
  const filteredHymns = useMemo(() => {
    return hymns.filter(h => h.first_letter === letter)
  }, [letter])
  return (
    <StyledBox>
      <StyledList>
        {filteredHymns.map((h, index) => (
          <HymnTitle
            title={h.first_string}
            number={h.number}
            id={h._id}
            hymnsList={filteredHymns}
            index={index}
            BorderBottom={Divider}
            onTitleClick={handleTitleClick}
          />
        ))}
      </StyledList>
      <StyledFab color='primary' aria-label='add' onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  )
}

export default HymnsList
