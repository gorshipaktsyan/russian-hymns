import createNavItems from "./createNavItems";

function findHymns(currentNumber, hymns) {
  if (!currentNumber || !hymns) return [];
  return currentNumber.map((number) =>
    hymns.find((h) => Number(h.number) === Number(number))
  );
}

function findBy(array, key, value) {
  return array.find((i) => i[key] === value);
}

function findInStore(value, data) {
  if (data.length && value.length) {
    const hasNumber = data.some((currentDay) =>
      currentDay.number.some((number) => value.includes(number))
    );
    return hasNumber;
  }
  return false;
}

function findSearchedNumbers(input, property, hymns) {
  const numbers = input.split(",").map((num) => Number(num.trim()));
  return hymns
    .filter((h) => numbers.includes(h[property]))
    .map((h) => h.number);
}

function findHymnsWithMatchKey(searchedText, regExp, hymns) {
  const lowerCaseText = searchedText.toLowerCase();
  const regExpOnlyLetters = new RegExp(regExp, "g");
  const textWithoutSpacesAndSymbols = lowerCaseText.replace(
    regExpOnlyLetters,
    ""
  );

  if (textWithoutSpacesAndSymbols === "") return [];

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

  return hymnsWithMatchKey.filter((h) => h.matches);
}

export default function findTitle(currentNumber, pathname, hymns, lg) {
  let newTitle;

  if (currentNumber.length && pathname === `/hymns/${currentNumber}`) {
    const currentHymn = hymns.find((h) => currentNumber.includes(h.number));

    if (currentNumber.length > 1) {
      newTitle = `${lg.hymns} ${currentNumber
        .slice(0, 3)
        .map((number) => " " + number)}${
        currentNumber.length > 3 ? " ..." : ""
      }`;
    } else {
      newTitle = `${lg.hymn} ${currentNumber}<sup>${
        currentHymn?.sign || ""
      }</sup>`;
    }

    return newTitle;
  } else {
    const navItems = createNavItems(lg);
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);
    return selectedItem ? selectedItem.title : null;
  }
}

export {
  findBy,
  findHymns,
  findInStore,
  findSearchedNumbers,
  findHymnsWithMatchKey,
  findTitle,
};
