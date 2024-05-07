import hymns from "../view/services/storage/hymns.json";

export default function findText(text, language) {
  const lowerCaseText = text.toLowerCase();
  const textWithoutSpacesAndSymbols = lowerCaseText.replace(
    language.regExp.onlyLetters,
    ""
  );

  const findedHymns = hymns.filter((h) => {
    const hymn = h.text.replace(/\n/g, "");
    const hymnWithoutSpAndSymbols = hymn.replace(
      language.regExp.onlyLetters,
      ""
    );

    return (
      hymn.includes(lowerCaseText) ||
      hymnWithoutSpAndSymbols.includes(textWithoutSpacesAndSymbols)
    );
  });
  return findedHymns;
}
