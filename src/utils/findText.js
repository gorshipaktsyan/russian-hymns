import hymns from "../view/services/storage/hymns.json";

export default function findText(text, language) {
  const lowerCaseText = text.toLowerCase();
  const textWithoutSpacesAndSymbols = lowerCaseText.replace( language.regExp.onlyLetters,"");
  if (textWithoutSpacesAndSymbols === "") {
    return [];
  }
  const findedHymns = hymns.filter((h) => {
    const hymnWithoutSpacesAndSymbols = h.text
      .toLowerCase()
      .replace( language.regExp.onlyLetters, "");
    return hymnWithoutSpacesAndSymbols.includes(textWithoutSpacesAndSymbols);
  });
  return findedHymns;
}
