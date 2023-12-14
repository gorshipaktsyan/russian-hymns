import React from "react";
import { useSwipeable } from "react-swipeable";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import hymns from "../../services/storage/hymns.json";
import "./index.scss";

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};
function Hymn({ currentNumber, setCurrentNumber }) {
  const navigate = useNavigate();

  const hymn = hymns.find((h) => Number(h.number) === Number(currentNumber));

  function handleLeftSwipe() {
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber + 1)
    );
    if (index !== -1) {
      setCurrentNumber(currentNumber + 1);
    }
  }

  function handleRightSwipe(n) {
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber - 1)
    );
    if (index !== -1) {
      setCurrentNumber(currentNumber - 1);
    }
  }

  const handlers = useSwipeable(
    {
      onSwipedLeft: () => handleLeftSwipe(),
      onSwipedRight: () => handleRightSwipe(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true,
    },
    config
  );

  function handleSearch() {
    navigate("/russian-hymns/search");
  }

  return (
    <Box sx={{ width: "100%" }} {...handlers}>
      {<div dangerouslySetInnerHTML={{ __html: hymn?.html }} />}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "grey" },
        }}
        onClick={handleSearch}
      >
        <SearchIcon />
      </Fab>
    </Box>
  );
}

export default Hymn;
