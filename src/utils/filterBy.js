export default function filterBy(array, key, compareValue, operator) {
  if (typeof compareValue === "function") {
    return array.filter((item) => compareValue(item[key]));
  }
  if (operator === "!==") {
    const filteredArray = array.filter((i) => i[key] !== compareValue);
    return filteredArray;
  }
  const filteredArray = array.filter((i) => i[key] === compareValue);
  return filteredArray;
}
