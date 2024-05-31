import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import './index.scss';
import HymnStyledComponents from './styles';
import { setCurrentNumber } from '../../../redux/slice/currentNumberSlice';
import { useAddToHistory, useSwipeNavigation } from '../../../utils/hooks';
import { hymnsService } from '../../../services';

const {
  StyledDivider,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowLeftWrapper,
  ArrowRightWrapper,
  MobArrowRightIcon,
  MobArrowLeftIcon
} = HymnStyledComponents;

function Hymn() {
  const { number } = useParams();
  const settings = useSelector((state) => state.settings);
  const currentNumber = useSelector((state) => state.currentNumber.currentNumber);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useAddToHistory(currentNumber);

  const { handleLeftSwipe, handleRightSwipe, handlers } = useSwipeNavigation({
    currentNumber,
    navigate
  });

  useEffect(() => {
    number && dispatch(setCurrentNumber(number.split(',').map(Number)));
  }, [number, dispatch]);

  const foundHymns = hymnsService.findHymns(currentNumber);
  return (
    <>
      <Box
        className="hymns-page-wrapper"
        sx={{
          paddingBottom: '200px'
        }}
        {...handlers}
      >
        {foundHymns?.map((h, index) => {
          return (
            <Box key={index}>
              <div className="hymnInfo">
                {foundHymns.length > 1 && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${settings.language.hymn} ${h.number}<sup>${h.sign}</sup>`
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
              {index !== foundHymns.length - 1 && <StyledDivider />}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default Hymn;
