import hymns from "../view/services/storage/hymns.json";

export default function searchTextAndSubmit(
  rusNumber,
  engNumber,
  searchedText,
  setRusNumber,
  setEngNumber,
  setSearchedText,
  setCurrentNumber,
  setFindedHymns,
  lg,
  dispatch,
  navigate,
  setErrorAlert
) {
  let number;
  if (rusNumber) {
    number = searchRussianNumber();
  } else if (engNumber) {
    number = searchEnglishNumber();
  } else if (searchedText) {
    setFindedHymns(findText());
    return;
  } else {
    const randomNumber = Math.floor(Math.random() * 800);
    dispatch(setCurrentNumber([randomNumber]));

    number = [randomNumber];
  }
  if (number.length) {
    navigate(`/hymns/${number}`);
  }
  setErrorAlert(true);
  setRusNumber("");
  setEngNumber("");
  setSearchedText("");

  function searchRussianNumber() {
    return findSearchedNumbers(rusNumber, "number");
  }
  function searchEnglishNumber() {
    return findSearchedNumbers(engNumber, "number_eng");
  }
  function findSearchedNumbers(input, property) {
    const numbers = input.split(",").map((num) => Number(num.trim()));
    const matchingHymns = hymns.filter((h) => numbers.includes(h[property]));
    const resultNumbers = matchingHymns.map((h) => h.number);
    resultNumbers.length && dispatch(setCurrentNumber(resultNumbers));

    return resultNumbers;
  }

  function findText() {
    const lowerCaseText = searchedText.toLowerCase();
    const textWithoutSpacesAndSymbols = lowerCaseText.replace(
      lg.regExp.onlyLetters,
      ""
    );
    if (textWithoutSpacesAndSymbols === "") {
      return [];
    }
    const findedHymns = hymns.filter((h) => {
      const hymnWithoutSpacesAndSymbols = h.text
        .toLowerCase()
        .replace(lg.regExp.onlyLetters, "");
      return hymnWithoutSpacesAndSymbols.includes(textWithoutSpacesAndSymbols);
    });
    return findedHymns;
  }
}
