import { useNavigate } from "react-router-dom";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import titles from "../../services/storage/titles.json"
import styled from "@emotion/styled";

function Bookmarks({ setCurrentNumber }) {
    const SAVED = persistentStore.get("savedHymns")
    const SAVED_HYMNS = titles.filter((title) => SAVED.includes(String(title._id)))
    const navigate = useNavigate();
    const StyledBox = styled(Box)({
        display: "flex",
        justifyContent: "center"
    })
    const StyledListItem = styled(ListItem)({

        "&:hover": {
            backgroundColor: "rgb(240, 240, 220)",
            cursor: "pointer"
        }
    })
    function handleClick(id) {
        setCurrentNumber(id)
        navigate("/russian-hymns");
    }
    return (
        <StyledBox>
            <List>
                {SAVED_HYMNS.map((title) => (
                    <>
                        <StyledListItem key={title._id} onClick={() => handleClick(title._id)}>
                            <ListItemText primary={title.name}></ListItemText>
                        </StyledListItem>
                        <Divider />
                    </>
                ))}
            </List>

        </StyledBox>
    );
}

export default Bookmarks
