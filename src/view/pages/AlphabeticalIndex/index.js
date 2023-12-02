import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Alphabet from "./Alphabet";
import HymnsList from "./HymnsList";
import persistentStore from "../../services/PersistentStore";
import './index.scss'

function AlphabeticalIndex({setCurrentNumber}) {
  const [letter, setLetter] = useState("")
  const navigate = useNavigate();

  function handleTitleClick(hymn) {
    setCurrentNumber(hymn.number);
    const searchedNumbers = persistentStore.get("searchedNumbers") || [];
    const numbers = [...new Set([hymn.number, ...searchedNumbers])];
    persistentStore.set("searchedNumbers", numbers);
    navigate("/russian-hymns");
  }

  return (
    <div className='alphabetical-page'>
      {letter ? (
        <HymnsList letter={letter} handleTitleClick={handleTitleClick} handleBackClick={() => setLetter("")}/>
      ) : (
        <Alphabet setLetter={setLetter}/>
      )}
    </div>
  )
}

export default AlphabeticalIndex;
