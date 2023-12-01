import React from "react";
import { useSwipeable } from "react-swipeable";
import Box from "@mui/material/Box";
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
  console.log(currentNumber)
  return (
    <Box sx={{ width: "100%" }} {...handlers}>
      {<div dangerouslySetInnerHTML={{ __html: hymn?.html }} />}
    </Box>
  );
}

export default Hymn;
