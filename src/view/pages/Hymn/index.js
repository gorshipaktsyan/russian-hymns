import React, { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useDoubleTap } from "use-double-tap";
import hymns from "../../services/storage/hymns.json";
import Box from "@mui/material/Box";
import "./index.scss";
import HymnStyledComponents from "./styles";

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true },
};
const { StyledDivider } = HymnStyledComponents;

function Hymn({ open, currentNumber, setCurrentNumber }) {
  const [fontSize, setFontSize] = useState(1);
  const hymn = useMemo(
    () =>
      currentNumber.map((number) =>
        hymns.find((h) => Number(h.number) === Number(number))
      ),
    [currentNumber]
  );

  const doubleTapLeftHandlers = useDoubleTap(
    (event) => {
      // setFontSize((prevSize) => prevSize + 0.1);
      alert("a");
    },
    { maxDelay: 300 }
  );

  const doubleTapRightHandlers = useDoubleTap(
    (event) => {
      // setFontSize((prevSize) => prevSize - 0.1);
      alert("a");
    },
    { maxDelay: 300 }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleLeftSwipe() {
    if (open) {
      return;
    }
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] + 1)
    );
    if (index !== -1) {
      setCurrentNumber([currentNumber[0] + 1]);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleRightSwipe() {
    if (open) {
      return;
    }
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] - 1)
    );
    if (index !== -1) {
      setCurrentNumber([currentNumber[0] - 1]);
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

  useEffect(() => {
    const boxElement = document.querySelector(".hymns-page-wrapper");
    if (boxElement) {
      boxElement.style.fontSize = `${fontSize}em`;
    }
    return () => {
      if (boxElement) {
        boxElement.style.fontSize = "";
      }
    };
  }, [fontSize]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handleRightSwipe();
      } else if (event.key === "ArrowRight") {
        handleLeftSwipe();
      }
    };

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      className="hymns-page-wrapper"
      sx={{
        paddingBottom: "200px",
      }}
      {...handlers}
    >
      {hymn.map((h, index) => {
        return (
          <Box key={index}>
            <div className="hymnInfo">
              {hymn.length > 1 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `Гимн ${h.number}<sup>${h.sign}</sup>`,
                  }}
                />
              )}
            </div>
            <Box dangerouslySetInnerHTML={{ __html: h?.html }} />
            {index !== hymn.length - 1 && <StyledDivider />}
          </Box>
        );
      })}
    </Box>
  );
}

export default Hymn;
