import hymns from "../view/services/storage/hymns.json";

export default function findText(text) {
  const lowerCaseText = text.toLowerCase();
  const textWithoutSpacesAndSymbols = lowerCaseText.replace(/[^а-яА-Я]/g, "");
  if (textWithoutSpacesAndSymbols === "") {
    return [];
  }
  const findedHymns = hymns.filter((h) => {
    const hymnWithoutSpacesAndSymbols = h.text
      .toLowerCase()
      .replace(/[^а-яА-Я]/g, "");
    return hymnWithoutSpacesAndSymbols.includes(textWithoutSpacesAndSymbols);
  });
  return findedHymns;
}
