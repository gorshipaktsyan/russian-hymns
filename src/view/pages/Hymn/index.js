import React, { useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import hymns from "../../services/storage/hymns.json";
import Box from "@mui/material/Box";
import "./index.scss";
import HymnStyledComponents from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import useAddToHistory from "../../../utils/hooks/useAddToHistory";
import { useKeyboardNavigation } from "../../../utils/hooks/useKeyboardClick";

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

function Hymn() {
  const { number } = useParams();
  const isMobile = useSelector((state) => state.settings.isMobile);
  const lg = useSelector((state) => state.settings.language);
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const useArrows = useSelector((state) => state.settings.useArrows);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hymn = useMemo(
    () =>
      currentNumber.map((number) =>
        hymns.find((h) => Number(h.number) === Number(number))
      ),
    [currentNumber]
  );

  useEffect(() => {
    number && dispatch(setCurrentNumber(number.split(",").map(Number)));
  }, [number, dispatch]);

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

  useKeyboardNavigation(handleLeftSwipe, handleRightSwipe);
  useAddToHistory(currentNumber);
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
