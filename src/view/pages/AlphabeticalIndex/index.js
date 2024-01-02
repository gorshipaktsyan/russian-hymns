import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alphabet from './Alphabet'
import HymnsList from './HymnsList'
import './index.scss'
import historyStore from '../../services/HistoryStore'

function AlphabeticalIndex ({ setCurrentNumber }) {
  const [letter, setLetter] = useState('')
  const navigate = useNavigate()

  function handleTitleClick (id) {
    const hymnIds = historyStore.set('searchedHymns', id)
    setCurrentNumber(hymnIds)
    navigate('/russian-hymns')
  }

  return (
    <div className='alphabetical-page'>
      {letter ? (
        <HymnsList
          letter={letter}
          handleTitleClick={handleTitleClick}
          handleBackClick={() => setLetter('')}
        />
      ) : (
        <Alphabet setLetter={setLetter} />
      )}
    </div>
  )
}

export default AlphabeticalIndex
