import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitlesList from './TitlesList'
import SubTitlesList from './SubTitlesList'
import './index.scss'
import historyStore from '../../services/HistoryStore'

function Content ({ setCurrentNumber }) {
  const [selectedTitle, setSelectedTitle] = useState(null)
  const navigate = useNavigate()

  function handleTitleClick (id) {
    setSelectedTitle(id)
  }

  function handleHymnClick (id) {
    const hymnIds = historyStore.set('searchedHymns', id)
    setCurrentNumber(hymnIds)
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
