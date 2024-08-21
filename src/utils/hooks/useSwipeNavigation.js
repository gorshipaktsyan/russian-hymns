import { useSwipeable } from 'react-swipeable';

import swipeConfig from '../../config/swipeConfig';
import { hymnsService } from '../../services';

import { useKeyboardNavigation } from './useKeyboardClick';

export default function useSwipeNavigation({ currentHymns, navigate }) {
  function handleLeftSwipe(e) {
    e.event ? e.event.stopPropagation() : e.stopPropagation();

    const biggestNumber = Math.max(...currentHymns) + 1;
    const index = hymnsService.findIndex(biggestNumber);
    if (index !== -1) {
      navigate(`/hymns/${biggestNumber}`);
    }
  }

  function handleRightSwipe(e) {
    e.event ? e.event.stopPropagation() : e.stopPropagation();

    const smallestNumber = Math.min(...currentHymns) - 1;
    const index = hymnsService.findIndex(smallestNumber);
    if (index !== -1) {
      navigate(`/hymns/${smallestNumber}`);
    }
    if (currentNumber[0] === 1) {
      navigate('/hymns/1');
    }
  }

  useKeyboardNavigation(handleLeftSwipe, handleRightSwipe);

  const handlers = useSwipeable({
    onSwipedLeft: handleLeftSwipe,
    onSwipedRight: handleRightSwipe,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    swipeConfig
  });

  return {
    handleLeftSwipe,
    handleRightSwipe,
    handlers
  };
}
