import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addHymn } from "../../redux/slice/historySlice";
import historyStore from "../../view/services/stores/HistoryStore";

export default function useAddToHistory(currentNumber) {
  const dispatch = useDispatch();
  const [prevNumber, setPrevNumber] = useState(null);
  const [timeOnPage, setTimeOnPage] = useState(0);

  useEffect(() => {
    let timerInterval;
    const hasNumber = historyStore.find(currentNumber);

    if (prevNumber !== currentNumber) {
      setPrevNumber(currentNumber);
      setTimeOnPage(0);
    }
    if (!hasNumber) {
      timerInterval = setInterval(() => {
        setTimeOnPage((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (timeOnPage >= 30 && !hasNumber) {
      dispatch(addHymn(currentNumber));
      setTimeOnPage(0);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [currentNumber, timeOnPage, dispatch, prevNumber]);

  return { timeOnPage };
}
