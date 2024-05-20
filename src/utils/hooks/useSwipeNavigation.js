import { useSwipeable } from "react-swipeable";
import { useKeyboardNavigation } from "./useKeyboardClick";
import config from "../../config/constants/hymnConfig";

export default function useSwipeNavigation({ currentNumber, hymns, navigate }) {
  // Handle left swipe
  function handleLeftSwipe(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] + 1)
    );
    if (index !== -1) {
      navigate(`/hymns/${currentNumber[0] + 1}`);
    }
  }

  function handleRightSwipe(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const index = hymns.findIndex(
      (el) => Number(el.number) === Number(currentNumber[0] - 1)
    );
    if (index !== -1) {
      navigate(`/hymns/${currentNumber[0] - 1}`);
    }
  }

  useKeyboardNavigation(handleLeftSwipe, handleRightSwipe);

  const handlers = useSwipeable({
    onSwipedLeft: handleLeftSwipe,
    onSwipedRight: handleRightSwipe,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    config,
  });

  return {
    handleLeftSwipe,
    handleRightSwipe,
    handlers,
  };
}
