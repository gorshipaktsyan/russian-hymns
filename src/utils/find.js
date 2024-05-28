import { setCurrentNumber } from "../redux/slice/currentNumberSlice";
import createNavItems from "./createNavItems";
import { filterArray } from "./filter";

function findLocation(pathname, lg) {
  const navItems = createNavItems(lg);
  const selectedItem = navItems.find((item) => `/${item.route}` === pathname);

  return selectedItem && selectedItem.title;
}

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

function findSearchedNumbers(input, property, hymns, dispatch) {
  const numbers = input.split(",").map((num) => Number(num.trim()));
  const matchingHymns = filterArray(hymns, property, (value) =>
    numbers.includes(value)
  );
  const resultNumbers = matchingHymns.map((h) => h.number);
  resultNumbers.length && dispatch(setCurrentNumber(resultNumbers));

  return resultNumbers;
}

export { findBy, findHymns, findInStore, findLocation, findSearchedNumbers };
