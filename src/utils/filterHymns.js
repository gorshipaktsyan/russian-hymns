import hymns from "../view/services/storage/hymns.json";

export default function filterHymns(letter, lg) {
  const removeSymbols = (text) => text.replace(lg.regExp.onlyLetters, "");
  return hymns
    .filter(
      (h) => h.first_letter === letter || h.first_letter_chorus === letter
    )
    .map((hymn) => {
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
    })
    .sort((a, b) => {
      return a.filteredText.localeCompare(b.filteredText, lg.language, {
        sensitivity: "base",
      });
    });
}
