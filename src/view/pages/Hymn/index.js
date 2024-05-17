import React, { useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Box from "@mui/material/Box";
import "./index.scss";
import HymnStyledComponents from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import useAddToHistory from "../../../utils/hooks/useAddToHistory";
import { useKeyboardNavigation } from "../../../utils/hooks/useKeyboardClick";
import { config } from "../../../config/constants/hymnConfig";

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
  const settings = useSelector((state) => state.settings);
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const hymns = useSelector((state) => state.hymns.hymns);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useKeyboardNavigation(handleLeftSwipe, handleRightSwipe);
  useAddToHistory(currentNumber);

  useEffect(() => {
    number && dispatch(setCurrentNumber(number.split(",").map(Number)));
  }, [number, dispatch]);

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

  const findedHymns = currentNumber.map((number) =>
    hymns.find((h) => Number(h.number) === Number(number))
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

  return (
    <>
      <Box
        className="hymns-page-wrapper"
        sx={{
          paddingBottom: "200px",
        }}
        {...handlers}
      >
        {findedHymns.map((h, index) => {
          return (
            <Box key={index}>
              <div className="hymnInfo">
                {findedHymns.length > 1 && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${settings.language.hymn} ${h.number}<sup>${h.sign}</sup>`,
                    }}
                  />
                )}
              </div>
              <Box dangerouslySetInnerHTML={{ __html: h?.html }} />
              <>
                {!settings.isMobile ? (
                  <>
                    <ArrowLeftWrapper onClick={handleRightSwipe}>
                      <ArrowLeftIcon />
                    </ArrowLeftWrapper>
                    <ArrowRightWrapper onClick={handleLeftSwipe}>
                      <ArrowRightIcon />
                    </ArrowRightWrapper>
                  </>
                ) : (
                  settings.isAllowToUseArrows && (
                    <>
                      <MobArrowLeftIcon onClick={handleRightSwipe} />
                      <MobArrowRightIcon onClick={handleLeftSwipe} />
                    </>
                  )
                )}
              </>
              {index !== findedHymns.length - 1 && <StyledDivider />}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default Hymn;
