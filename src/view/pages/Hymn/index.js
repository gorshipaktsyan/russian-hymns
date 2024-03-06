import React, { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import hymns from "../../services/storage/hymns.json";
import Box from "@mui/material/Box";
import "./index.scss";
import HymnStyledComponents from "./styles";
import historyStore from "../../services/HistoryStore";
import { useParams } from "react-router-dom";

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true },
};
const { StyledDivider, ArrowRightIcon, ArrowLeftIcon } = HymnStyledComponents;

const isMobile = navigator.maxTouchPoints > 0;

function Hymn({ setCurrentNumber, currentNumber }) {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [prevNumber, setPrevNumber] = useState();
  const { number } = useParams();
  useEffect(() => {
    number && setCurrentNumber(number.split(",").map(Number));
  }, [number]);

  const hymn = useMemo(
    () =>
      currentNumber.map((number) =>
        hymns.find((h) => Number(h.number) === Number(number))
      ),
    [currentNumber]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleLeftSwipe() {
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] + 1)
    );
    if (index !== -1) {
      setCurrentNumber([currentNumber[0] + 1]);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleRightSwipe() {
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
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handleRightSwipe();
      } else if (event.key === "ArrowRight") {
        handleLeftSwipe();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRightSwipe, handleLeftSwipe]);

  useEffect(() => {
    let timerInterval;
    const hasNumber = historyStore.find(currentNumber);
    setPrevNumber(currentNumber);

    if (!hasNumber) {
      timerInterval = setInterval(() => {
        setTimeOnPage((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (timeOnPage >= 30 && !hasNumber) {
      historyStore.set(currentNumber);
      setTimeOnPage(0);
    }
    currentNumber !== prevNumber && setTimeOnPage(0);

    return () => {
      clearInterval(timerInterval);
    };
  }, [currentNumber, timeOnPage]);

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
            {!isMobile && (
              <>
                <ArrowLeftIcon onClick={() => handleRightSwipe()} />
                ,
                <ArrowRightIcon onClick={() => handleLeftSwipe()} />
              </>
            )}
            {index !== hymn.length - 1 && <StyledDivider />}
          </Box>
        );
      })}
    </Box>
  );
}

export default Hymn;
