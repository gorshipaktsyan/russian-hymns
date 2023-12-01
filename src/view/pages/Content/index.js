import { List, ListItem, ListItemText, Divider } from "@mui/material";
import titles from "../../services/storage/titles.json";
import './index.scss';

function Content() {

    function handleTitleClose(title) {
        alert(title.name)
    }

    return (
        <div className='content-page'>
            <List className='list-wrapper'>
                {titles.map((title) => (
                    <>
                        <ListItem className='item' key={title._id} onClick={() => handleTitleClose(title)}>
                            <ListItemText className='text' primary={title.name} />
                        </ListItem>
                        <Divider t />
                    </>

                ))}
            </List>
        </div>
    )
}

export default Content
