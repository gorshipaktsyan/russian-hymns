import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alphabet from './Alphabet'
import HymnsList from './HymnsList'
import historyStore from '../../services/HistoryStore'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledBox } = StyledComponents

function AlphabeticalIndex ({ setCurrentNumber }) {
  const [letter, setLetter] = useState('')
  const navigate = useNavigate()

  function handleTitleClick (id) {
    const hymnIds = historyStore.set('searchedHymns', id)
    setCurrentNumber(hymnIds)
    navigate('/russian-hymns')
  }

  return (
    <StyledBox>
      {letter ? (
        <HymnsList
          letter={letter}
          handleTitleClick={handleTitleClick}
          handleBackClick={() => setLetter('')}
        />
      ) : (
        <Alphabet setLetter={setLetter} />
      )}
    </StyledBox>
  )
}

export default AlphabeticalIndex
