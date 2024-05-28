import { filterArray } from "./filter";
import { findSearchedNumbers } from "./find";

function searchRussianNumber(rusNumber, hymns, dispatch) {
  return findSearchedNumbers(rusNumber, "number", hymns, dispatch);
}
function searchEnglishNumber(engNumber, hymns, dispatch) {
  return findSearchedNumbers(engNumber, "number_eng", hymns, dispatch);
}

function searchHymnsByText(searchedText, lg, hymns) {
  const lowerCaseText = searchedText.toLowerCase();
  const regExpOnlyLetters = new RegExp(lg.regExp.onlyLetters, "g");

  const textWithoutSpacesAndSymbols = lowerCaseText.replace(
    regExpOnlyLetters,
    ""
  );

  if (textWithoutSpacesAndSymbols === "") {
    return [];
  }

  const hymnsWithMatchKey = hymns.map((hymn) => {
    const hymnWithoutSpacesAndSymbols = hymn.text
      .toLowerCase()
      .replace(regExpOnlyLetters, "");
    return {
      ...hymn,
      matches: hymnWithoutSpacesAndSymbols.includes(
        textWithoutSpacesAndSymbols
      ),
    };
  });
  const findedHymns = filterArray(hymnsWithMatchKey, "matches", true);
  return findedHymns;
}

export { searchRussianNumber, searchEnglishNumber, searchHymnsByText };
