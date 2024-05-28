function filterHymnsByLetter(letter, lg, hymns) {
  const removeSymbols = (text) => text.replace(lg.regExp.onlyLetters, "");
  const filteredHymns = hymns.filter(
    (h) => h.first_letter === letter || h.first_letter_chorus === letter
  );
  const mappedHymns = mapHymns(filteredHymns, removeSymbols, letter);

  const sortedHymns = mappedHymns.sort((a, b) => {
    return a.filteredText.localeCompare(b.filteredText, lg.language, {
      sensitivity: "base",
    });
  });
  return sortedHymns;
}

function mapHymns(filteredHymns, removeSymbols, letter) {
  return filteredHymns.map((hymn) => {
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
}
export { filterHymnsByLetter };
