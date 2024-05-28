import { setCurrentNumber } from "../redux/slice/currentNumberSlice";
import { setFindedHymns } from "../redux/slice/searchSlice";
import {
  searchRussianNumber,
  searchEnglishNumber,
  searchHymnsByText,
} from "./search";

export default function submit({
  rusNumber,
  engNumber,
  searchedText,
  setRusNumber,
  setEngNumber,
  setSearchedText,
  setErrorAlert,
  lg,
  dispatch,
  navigate,
  hymns,
}) {
  let number;
  if (rusNumber) {
    number = searchRussianNumber(rusNumber, hymns, dispatch);
  } else if (engNumber) {
    number = searchEnglishNumber(engNumber, hymns, dispatch);
  } else if (searchedText) {
    const findedHymns = searchHymnsByText(searchedText, lg, hymns);
    dispatch(setFindedHymns(findedHymns));
    return;
  } else {
    const randomNumber = Math.floor(Math.random() * 800);
    dispatch(setCurrentNumber([randomNumber]));

    number = [randomNumber];
  }
  if (number.length) {
    navigate(`/hymns/${number}`);
    dispatch(setFindedHymns([]));
  }
  setErrorAlert(true);
  setRusNumber("");
  setEngNumber("");
  setSearchedText("");
}
