import React from "react";
import hymns from "../../services/storage/hymns.json";
import {
  Box,
  Divider,
  Fab,
  List,
  ListItem,
  Modal,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#fdfde8",
  border: "2px solid #000",
  boxShadow: "0px 0px 20px 5px ",
  padding: "4px",
});
const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});

function HymnList({ open, setOpen, searchedText, setCurrentNumber, navigate }) {
  const hymnsByText = hymns.filter((h) => h.text.includes(searchedText));
  const handleClose = () => setOpen(false);

  function handleClick(id) {
    setCurrentNumber(id);
    navigate("/russian-hymns");
  }
  const handleBackClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <List sx={{ overflowY: "auto", height: "100vh" }}>
            {hymnsByText.map((h) => (
              <>
                <StyledListItem
                  key={h?._id}
                  onClick={() => handleClick(h?._id)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box>{h?.first_string}</Box>
                    <Box>{h?.number}</Box>
                  </Box>
                </StyledListItem>
                <Divider />
              </>
            ))}
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: "20px",
                right: "30px",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "grey" },
              }}
              onClick={handleBackClick}
            >
              <CloseIcon />
            </Fab>
          </List>
        </StyledBox>
      </Modal>
    </div>
  );
}
export default HymnList;
