import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alphabet from './Alphabet'
import HymnsList from './HymnsList'
import persistentStore from '../../services/PersistentStore'
import './index.scss'

function AlphabeticalIndex ({ setCurrentNumber }) {
  const [letter, setLetter] = useState('')
  const navigate = useNavigate()

  function handleTitleClick (hymn) {
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const currentDate = new Date()
    const HYMN_OBJECT = { number: hymn.number, date: currentDate }
    const UPDATED_HYMNS = [...new Set([HYMN_OBJECT, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    setCurrentNumber([hymn.number])
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
