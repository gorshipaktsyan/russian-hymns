import { List, ListItem } from "@mui/material";
import hymnsStorage from "../../../utils/storage";
function History() {
  const history = hymnsStorage.get();
  return (
    <List>
      {history.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export default History;
