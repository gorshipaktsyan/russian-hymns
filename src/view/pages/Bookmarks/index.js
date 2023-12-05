import { useNavigate } from "react-router-dom";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import hymns from "../../services/storage/hymns.json";
import styled from "@emotion/styled";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
const StyledListItem = styled(ListItem)({
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});

function Bookmarks({ setCurrentNumber }) {
  const SAVED = [persistentStore.get("savedHymns")] || [];
  const SAVED_HYMNS = hymns.filter((h) => SAVED.includes(h._id));
  const navigate = useNavigate();

  function handleClick(id) {
    setCurrentNumber(id);
    navigate("/russian-hymns");
  }
  return (
    <StyledBox>
      <List>
        {SAVED_HYMNS.map((h) => (
          <>
            <StyledListItem key={h._id} onClick={() => handleClick(h._id)}>
              <Box>{h?.first_string}</Box>
              <Box>{h?.number}</Box>
            </StyledListItem>
            <Divider />
          </>
        ))}
      </List>
    </StyledBox>
  );
}

export default Bookmarks;
