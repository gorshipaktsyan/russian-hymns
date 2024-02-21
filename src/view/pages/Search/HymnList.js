import React from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import Snackbar from "@mui/material/Snackbar";
import { Divider, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledComponents from "../../../utils/sharedStyles";
import SearchStyledComponents from "./styles";

const { StyledFab, StyledAlert } = StyledComponents;
const { StyledModalBox, StyledModalList } = SearchStyledComponents;

function HymnList({
  openHymnList,
  setOpenHymnList,
  findedHymns,
  setCurrentNumber,
  navigate,
}) {
  const handleClose = () => setOpenHymnList(false);

  function handleClick(id) {
    setCurrentNumber([id]);
    navigate("/hymns");
  }
  const handleBackClick = () => {
    setOpenHymnList(false);
  };
  return findedHymns.length > 0 ? (
    <div>
      <Modal
        open={openHymnList}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalBox>
          <StyledModalList>
            {findedHymns.map((h, index) => (
              <HymnTitle
                title={h?.first_string}
                number={h.number}
                id={h.number}
                hymnsList={findedHymns}
                index={index}
                BorderBottom={Divider}
                onTitleClick={handleClick}
              />
            ))}
            <StyledFab
              color="primary"
              aria-label="add"
              onClick={handleBackClick}
            >
              <CloseIcon />
            </StyledFab>
          </StyledModalList>
        </StyledModalBox>
      </Modal>
    </div>
  ) : (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openHymnList}
      onClose={handleClose}
      autoHideDuration={2000}
    >
      <StyledAlert onClose={handleClose} severity="error">
        Соответствующие гимны не найдены!
      </StyledAlert>
    </Snackbar>
  );
}
export default HymnList;
