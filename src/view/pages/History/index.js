import { List, ListItem } from "@mui/material";
import persistentStore from "../../services/PersistentStore";

function History() {

  const history = persistentStore.get();

  return (
    <List>
      {history.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export default History;
