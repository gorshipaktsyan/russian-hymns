import React, { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import hymns from "../../services/storage/hymns.json";
import Box from "@mui/material/Box";
import "./index.scss";
import HymnStyledComponents from "./styles";
import historyStore from "../../services/HistoryStore";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions/actions";

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true },
};
const {
  StyledDivider,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowLeftWrapper,
  ArrowRightWrapper,
  MobArrowRightIcon,
  MobArrowLeftIcon,
} = HymnStyledComponents;

function Hymn({ useArrows }) {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [prevNumber, setPrevNumber] = useState();
  const { number } = useParams();
  const isMobile = useSelector((state) => state.hymns.isMobile);
  const lg = useSelector((state) => state.hymns.language);
  const currentNumber = useSelector((state) => state.hymns.currentNumber);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    number &&
      dispatch({
        type: actions.SET_CURRENT_NUMBER,
        payload: number.split(",").map(Number),
      });
  }, [number, dispatch]);
  const hymn = useMemo(
    () =>
      currentNumber.map((number) =>
        hymns.find((h) => Number(h.number) === Number(number))
      ),
    [currentNumber]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleLeftSwipe(e) {
    e && e.stopPropagation();
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] + 1)
    );
    if (index !== -1) {
      navigate(`/hymns/${currentNumber[0] + 1}`);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleRightSwipe(e) {
    e && e.stopPropagation();
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] - 1)
    );
    if (index !== -1) {
      navigate(`/hymns/${currentNumber[0] - 1}`);
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
  }, [currentNumber, timeOnPage, prevNumber]);

  return (
    <>
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
                      __html: `${lg.hymn} ${h.number}<sup>${h.sign}</sup>`,
                    }}
                  />
                )}
              </div>
              <Box dangerouslySetInnerHTML={{ __html: h?.html }} />
              <>
                {!isMobile ? (
                  <>
                    <ArrowLeftWrapper onClick={handleRightSwipe}>
                      <ArrowLeftIcon />
                    </ArrowLeftWrapper>
                    <ArrowRightWrapper onClick={handleLeftSwipe}>
                      <ArrowRightIcon />
                    </ArrowRightWrapper>
                  </>
                ) : (
                  useArrows && (
                    <>
                      <MobArrowLeftIcon onClick={handleRightSwipe} />
                      <MobArrowRightIcon onClick={handleLeftSwipe} />
                    </>
                  )
                )}
              </>
              {index !== hymn.length - 1 && <StyledDivider />}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default Hymn;
