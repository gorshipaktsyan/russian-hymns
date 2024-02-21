import hymns from "../view/services/storage/hymns.json";

export default function findText(text) {
  const lowerCaseText = text.toLowerCase();
  const textWithoutSpaces = lowerCaseText.replace(/\s/g, "");
  const textWithoutSpandSymbols = lowerCaseText.replace(/[^а-яА-Я]/g, "");

  const findedHymns = hymns.filter((h) => {
    const hymn = h.text.replace(/\n/g, "");
    const hymnWithoutSpaces = h.text.replace(/\s/g, "");
    const hymnWithoutSpAndSymbols = hymnWithoutSpaces.replace(/[^а-яА-Я]/g, "");

    return (
      hymn.includes(lowerCaseText) ||
      hymnWithoutSpaces.includes(textWithoutSpaces) ||
      hymnWithoutSpAndSymbols.includes(textWithoutSpandSymbols)
    );
  });
  return findedHymns;
}
