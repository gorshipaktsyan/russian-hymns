import {List, ListItem, ListItemText, Divider} from "@mui/material";
import hymns from "../../services/storage/hymns.json";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/ArrowBack";
import './index.scss';

function HymnsList({handleTitleClick, letter, handleBackClick}) {
    const filteredHymns = hymns.filter(h => h.first_letter === letter)

    return (
        <>
            <List className='list-wrapper'>
                {filteredHymns.map((hymn) => (
                    <>
                        <ListItem className='item' key={hymn._id} onClick={() => handleTitleClick(hymn)}>
                            <ListItemText className='text' primary={hymn.title} />
                        </ListItem>
                        <Divider/>
                    </>

                ))}
            </List>
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '30px', right: '30px' }} onClick={handleBackClick}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default HymnsList
