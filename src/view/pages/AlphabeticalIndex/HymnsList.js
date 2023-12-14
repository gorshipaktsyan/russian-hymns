import { List, ListItem, Divider, Box } from "@mui/material";
import hymns from "../../services/storage/hymns.json";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import "./index.scss";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  with: "100%",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});

function HymnsList({ handleTitleClick, letter, handleBackClick }) {
  const filteredHymns = hymns.filter((h) => h.first_letter === letter);
  return (
    <>
      <StyledBox>
        <List className="list-wrapper">
          {filteredHymns.map((hymn) => (
            <>
              <StyledListItem
                className="item"
                key={hymn._id}
                onClick={() => handleTitleClick(hymn)}
              >
                <Box sx={{ maxWidth: "80%" }}>{hymn.first_string}</Box>
                <Box>{hymn.number}</Box>
              </StyledListItem>
              <Divider />
            </>
          ))}
        </List>
      </StyledBox>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "30px", right: "30px" }}
        onClick={handleBackClick}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default HymnsList;
