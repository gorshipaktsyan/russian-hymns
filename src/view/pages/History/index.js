import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import titles from "../../services/storage/titles.json"

function History({ setCurrentNumber }) {
  const HISTORY = persistentStore.get();
  const searchedHymns = titles.filter((title) => HISTORY.includes(String(title._id)))
  const navigate = useNavigate();

  function handleClick(id) {
    setCurrentNumber(id)
    navigate("/russian-hymns");
  }

  return (
    <List>
      {searchedHymns.map((title) => (
        <ListItem key={title._id} onClick={() => handleClick(title._id)}>
          <ListItemText primary={title.name}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default History;
