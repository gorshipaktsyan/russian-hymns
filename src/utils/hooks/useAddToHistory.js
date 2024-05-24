import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHymn } from "../../redux/slice/historySlice";
import setData from "../setData";
import { findInStore } from "../find";

export default function useAddToHistory(currentNumber) {
  const dispatch = useDispatch();
  const [timeOnPage, setTimeOnPage] = useState(0);
  const history = useSelector((state) => state.history.searchedHymns);

  useEffect(() => {
    let timerInterval;
    const hasNumber = findInStore(currentNumber, history);

    if (!hasNumber) {
      timerInterval = setInterval(() => {
        setTimeOnPage((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (timeOnPage >= 30 && !hasNumber) {
      const hymnObject = setData(currentNumber);
      dispatch(addHymn(hymnObject));
      setTimeOnPage(0);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [currentNumber, timeOnPage, dispatch, history]);

  return { timeOnPage };
}
