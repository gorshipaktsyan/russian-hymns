import { setCurrentNumber } from "../redux/slice/currentNumberSlice";
import { setFindedHymns } from "../redux/slice/searchSlice";
import filterBy from "./filterBy";

export default function searchTextAndSubmit({
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
    const findedHymns = findHymns(searchedText, lg, hymns);
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
function searchRussianNumber(rusNumber, hymns, dispatch) {
  return findSearchedNumbers(rusNumber, "number", hymns, dispatch);
}
function searchEnglishNumber(engNumber, hymns, dispatch) {
  return findSearchedNumbers(engNumber, "number_eng", hymns, dispatch);
}
function findSearchedNumbers(input, property, hymns, dispatch) {
  const numbers = input.split(",").map((num) => Number(num.trim()));
  const matchingHymns = filterBy(hymns, property, (value) =>
    numbers.includes(value)
  );
  const resultNumbers = matchingHymns.map((h) => h.number);
  resultNumbers.length && dispatch(setCurrentNumber(resultNumbers));

  return resultNumbers;
}

function findHymns(searchedText, lg, hymns) {
  const lowerCaseText = searchedText.toLowerCase();
  const textWithoutSpacesAndSymbols = lowerCaseText.replace(
    lg.regExp.onlyLetters,
    ""
  );
  if (textWithoutSpacesAndSymbols === "") {
    return [];
  }
  const hymnsWithMatchKey = hymns.map((hymn) => {
    const hymnWithoutSpacesAndSymbols = hymn.text
      .toLowerCase()
      .replace(lg.regExp.onlyLetters, "");
    return {
      ...hymn,
      matches: hymnWithoutSpacesAndSymbols.includes(
        textWithoutSpacesAndSymbols
      ),
    };
  });
  const findedHymns = filterBy(hymnsWithMatchKey, "matches", true);
  return findedHymns;
}
