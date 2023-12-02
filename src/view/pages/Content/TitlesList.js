import {List, ListItem, ListItemText, Divider} from "@mui/material";
import titles from "../../services/storage/titles.json";
import './index.scss';

function TitlesList({handleTitleClick}) {
    return (
        <List className='list-wrapper'>
            {titles.map((title) => (
                <>
                    <ListItem className='item' key={title._id} onClick={() => handleTitleClick(title)}>
                        <ListItemText className='text' primary={title.name} />
                    </ListItem>
                    <Divider />
                </>

            ))}
        </List>
    )
}

export default TitlesList
