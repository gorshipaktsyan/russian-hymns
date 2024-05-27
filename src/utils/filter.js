function filterArray(array, key, compareValue, operator) {
  if (typeof compareValue === "function") {
    return array.filter((item) => compareValue(item[key]));
  }
  if (operator === "!==") {
    const filteredArray = array.filter((i) => i[key] !== compareValue);
    return filteredArray;
  }
  return array.filter((i) => i[key] === compareValue);
}

function filterHymnsByLetter(letter, lg, hymns) {
  const removeSymbols = (text) => text.replace(lg.regExp.onlyLetters, "");
  const filteredHymns = hymns.filter(
    (h) => h.first_letter === letter || h.first_letter_chorus === letter
  );
  const mappedHymns = filteredHymns.map((hymn) => {
    if (hymn.first_letter === letter) {
      return {
        ...hymn,
        filteredByFirstLetter: true,
        filteredText: removeSymbols(hymn.first_string),
      };
    } else {
      return {
        ...hymn,
        filteredText: removeSymbols(hymn.chorus_first_string),
      };
    }
  });

  const sortedHymns = mappedHymns.sort((a, b) => {
    return a.filteredText.localeCompare(b.filteredText, lg.language, {
      sensitivity: "base",
    });
  });
  return sortedHymns;
}

function filterSavedHymns(savedHymns, value) {
  return savedHymns.map((date) => date.number.filter((n) => n !== value));
}

export { filterArray, filterHymnsByLetter, filterSavedHymns };
