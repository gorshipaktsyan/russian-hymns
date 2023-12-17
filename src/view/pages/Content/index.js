import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitlesList from './TitlesList'
import SubTitlesList from './SubTitlesList'
import persistentStore from '../../services/PersistentStore'
import './index.scss'

function Content ({ setCurrentNumber }) {
  const [selectedTitle, setSelectedTitle] = useState(null)
  const navigate = useNavigate()

  function handleTitleClick (title) {
    setSelectedTitle(title._id)
  }

  const handleHymnClick = hymn => {
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get('searchedNumbers') || []
    const HYMN_OBJECT = { number: hymn.number, date: currentDate }
    const UPDATED_HYMNS = [...new Set([HYMN_OBJECT, ...searchedNumbers])]
    persistentStore.set('searchedNumbers', UPDATED_HYMNS)
    setCurrentNumber(hymn.number)
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
