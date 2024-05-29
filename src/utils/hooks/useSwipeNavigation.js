import { useSwipeable } from "react-swipeable";
import { useKeyboardNavigation } from "./useKeyboardClick";
import swipeConfig from "../../config/swipeConfig";
import { hymnsService } from "../../services";

export default function useSwipeNavigation({ currentNumber, navigate }) {
  function handleLeftSwipe(e) {
    e?.stopPropagation();
    const nextHymnNumber = currentNumber[currentNumber.length - 1] + 1;
    const index = hymnsService.findIndex(nextHymnNumber);
    if (index !== -1) {
      navigate(`/hymns/${nextHymnNumber}`);
    }
  }

  function handleRightSwipe(e) {
    e?.stopPropagation();
    const prevHymnNumber = currentNumber[0] - 1;
    const index = hymnsService.findIndex(prevHymnNumber);
    if (index !== -1) {
      navigate(`/hymns/${prevHymnNumber}`);
    }
    if (currentNumber[0] === 1) {
      navigate("/hymns/1");
    }
  }

  useKeyboardNavigation(handleLeftSwipe, handleRightSwipe);

  const handlers = useSwipeable({
    onSwipedLeft: handleLeftSwipe,
    onSwipedRight: handleRightSwipe,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    swipeConfig,
  });

  return {
    handleLeftSwipe,
    handleRightSwipe,
    handlers,
  };
}
