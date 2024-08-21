import { ReactEventHandler } from 'react';
import HymnStyledComponents from './styles';

interface Arrows{
  isAllowToUseArrows: boolean
  isMobile: boolean
  handleLeftSwipe: ReactEventHandler
  handleRightSwipe: ReactEventHandler
}

const {
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowLeftWrapper,
  ArrowRightWrapper,
  MobArrowRightIcon,
  MobArrowLeftIcon
} = HymnStyledComponents;

export default function Arrows({
  isAllowToUseArrows,
  isMobile,
  handleLeftSwipe,
  handleRightSwipe
}: Arrows) {
  return (
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
        isAllowToUseArrows && (
          <>
            <MobArrowLeftIcon onClick={handleRightSwipe} />
            <MobArrowRightIcon onClick={handleLeftSwipe} />
          </>
        )
      )}
    </>
  );
}
