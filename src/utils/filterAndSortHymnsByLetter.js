import hymnsService from "../services/hymnsService";

function mapHymns(filteredHymns, letter, lg) {
  return filteredHymns.map((hymn) => {
    const isFirstLetterMatch = hymn.first_letter === letter;
    const filteredText = removeSymbols(
      isFirstLetterMatch ? hymn.first_string : hymn.chorus_first_string,
      lg
    );

    return {
      ...hymn,
      filteredByFirstLetter: isFirstLetterMatch,
      filteredText,
    };
  });
}

function removeSymbols(text, lg) {
  return text.replace(lg.regExp.onlyLetters, "");
}

export default function filterAndSortHymnsByLetter(letter, lg) {
  const filteredHymns = hymnsService.filterHymnsByLetter(letter);
  const mappedHymns = mapHymns(filteredHymns, letter, lg);

  const sortedHymns = hymnsService.sortHymns(mappedHymns, lg.language);
  return sortedHymns;
}
