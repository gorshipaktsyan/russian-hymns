import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addHymn } from '../../redux/slice/historySlice';
import { findInStore, setDataForHistory } from '..';
import { RootState } from '../../redux/store';

export default function useAddToHistory(currentNumber:number[]) {
  const dispatch = useDispatch();
  const [timeOnPage, setTimeOnPage] = useState(0);
  const history = useSelector((state:RootState) => state.history.searchedHymns);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout 
    const hasNumber = findInStore(currentNumber, history);

    if (!hasNumber) {
      timerInterval = setInterval(() => {
        setTimeOnPage((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (timeOnPage >= 30 && !hasNumber) {
      const hymnObject = setDataForHistory(currentNumber);
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
