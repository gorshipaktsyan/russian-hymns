import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitlesList from './TitlesList'
import SubTitlesList from './SubTitlesList'
import persistentStore from '../../services/PersistentStore'
import './index.scss'

function Content ({ setCurrentNumber }) {
  const [selectedTitle, setSelectedTitle] = useState(null)
  const navigate = useNavigate()

  function handleTitleClick (id) {
    setSelectedTitle(id)
  }

  function handleHymnClick (id) {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const hymnObject = { number: [id], date: currentDate }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', updatedHymns)
    setCurrentNumber([id])
    navigate('/russian-hymns')
  }

  return (
    <div className='content-page'>
      {selectedTitle ? (
        <SubTitlesList
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
          handleHymnClick={handleHymnClick}
        />
      ) : (
        <TitlesList handleTitleClick={handleTitleClick} />
      )}
    </div>
  )
}

export default Content
