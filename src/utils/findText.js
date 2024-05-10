import hymns from "../view/services/storage/hymns.json";

export default function findText(text, lg) {
  const lowerCaseText = text.toLowerCase();
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
