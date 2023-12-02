import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import TitlesList from "./TitlesList";
import SubTitlesList from "./SubTitlesList";
import persistentStore from "../../services/PersistentStore";
import './index.scss';

function Content({setCurrentNumber}) {
    const [selectedTitle, setSelectedTitle] = useState(null)
    const navigate = useNavigate();

    function handleTitleClick(title) {
        setSelectedTitle(title._id)
    }

    const handleHymnClick = (hymn) => {
        setCurrentNumber(hymn.number);
        const searchedNumbers = persistentStore.get("searchedNumbers") || [];
        const numbers = [...new Set([hymn.number, ...searchedNumbers])];
        persistentStore.set("searchedNumbers", numbers);
        navigate("/russian-hymns");
    }

    return (
        <div className='content-page'>
            {selectedTitle ? (
                <SubTitlesList selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} handleHymnClick={handleHymnClick} />
            ) : (
                <TitlesList handleTitleClick={handleTitleClick} />
            )}
        </div>
    )
}

export default Content
