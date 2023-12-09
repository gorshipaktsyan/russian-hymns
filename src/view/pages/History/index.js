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
  width: "100%",
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});
const StyledText = styled(Box)({
  padding: "5px",
});

function History({ setCurrentNumber }) {
  const HISTORY = persistentStore.get("searchedNumbers") || [];
  const searchedHymns = hymns.filter((h) => HISTORY.includes(h._id));
  const navigate = useNavigate();

  function handleClick(id) {
    setCurrentNumber(id);
    navigate("/russian-hymns");
  }

  return (
    <StyledBox>
      <List>
        {searchedHymns.map((h) => (
          <>
            <StyledListItem key={h?._id} onClick={() => handleClick(h?._id)}>
              <StyledText>{h?.number}</StyledText>
              <StyledText>{h?.first_string}</StyledText>
            </StyledListItem>
            <Divider />
          </>
        ))}
      </List>
    </StyledBox>
  );
}

export default History;
