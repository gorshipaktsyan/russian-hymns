import { List, ListItem, ListItemText, Divider } from "@mui/material";
import styled from "@emotion/styled";
import titles from "../../services/storage/titles.json";
import "./index.scss";

const StyledListItem = styled(ListItem)({
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});
function TitlesList({ handleTitleClick }) {
  return (
    <List className="list-wrapper">
      {titles.map((title) => (
        <>
          <StyledListItem
            className="item"
            key={title._id}
            onClick={() => handleTitleClick(title)}
          >
            <ListItemText className="text" primary={title.name} />
          </StyledListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}

export default TitlesList;
