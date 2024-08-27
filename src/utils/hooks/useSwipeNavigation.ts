import { useSwipeable, SwipeableHandlers, SwipeEventData } from 'react-swipeable';

import swipeConfig from '../../config/swipeConfig';
import { hymnsService } from '../../services';

import { useKeyboardNavigation } from './useKeyboardClick';
import { UseSwipeNavigationProps, SwipeEvent } from '../../types';
import { MouseEventHandler } from 'react';

export default function useSwipeNavigation({ currentHymns, navigate }: UseSwipeNavigationProps){
  const hymnNumbers = currentHymns.map((hymn) => hymn.number);

  function handleEvent(e: SwipeEventData | KeyboardEvent | MouseEvent) {
    if ('stopPropagation' in e) {
      e.stopPropagation();
    }
  }

  function handleLeftSwipe(e: SwipeEventData | MouseEvent) {
    handleEvent(e);

    const biggestNumber = Math.max(...hymnNumbers) + 1;
    const index = hymnsService.findIndex(biggestNumber);
    if (index !== -1) {
      navigate(`/hymns/${biggestNumber}`);
    }
  }

  function handleRightSwipe(e: SwipeEventData | MouseEvent) {
    handleEvent(e);

    const smallestNumber = Math.min(...hymnNumbers) - 1;
    const index = hymnsService.findIndex(smallestNumber);
    if (index !== -1) {
      navigate(`/hymns/${smallestNumber}`);
    }
    if (currentHymns[0].number === 1) {
      navigate('/hymns/1');
    }
  }

  function handleKeyboardLeftSwipe(e: KeyboardEvent) {
    handleLeftSwipe(e as unknown as SwipeEventData);
  }

  function handleKeyboardRightSwipe(e: KeyboardEvent) {
    handleRightSwipe(e as unknown as SwipeEventData);
  }

  useKeyboardNavigation({ handleLeftSwipe: handleKeyboardLeftSwipe, handleRightSwipe: handleKeyboardRightSwipe });

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: handleLeftSwipe,
    onSwipedRight: handleRightSwipe,
    ...swipeConfig
  });

  return {
    handleLeftSwipe: handleLeftSwipe as unknown as MouseEventHandler<HTMLElement>,
    handleRightSwipe: handleRightSwipe as unknown as MouseEventHandler<HTMLElement>,
    handlers
  };
}
