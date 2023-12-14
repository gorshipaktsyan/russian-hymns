import { useNavigate } from "react-router-dom";
import { Box, Divider, List, ListItem } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import hymns from "../../services/storage/hymns.json";
import styled from "@emotion/styled";

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
    backgroundColor: "#f0f0dc",
    cursor: "pointer",
  },
});
const StyledText = styled(Box)({
  padding: "5px",
});
function Bookmarks({ setCurrentNumber }) {
  const SAVED = persistentStore.get("savedHymns") || [];
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
              <StyledText>{h?.first_string}</StyledText>
              <StyledText>{h?.number}</StyledText>
            </StyledListItem>
            <Divider />
          </>
        ))}
      </List>
    </StyledBox>
  );
}

export default Bookmarks;
