function findHymns(currentNumber, hymns) {
  if (!currentNumber || !hymns) return [];
  return currentNumber.map((number) =>
    hymns.find((h) => Number(h.number) === Number(number))
  );
}

function findBy(array, key, value) {
  return array.find((i) => i[key] === value);
}

export { findBy, findHymns };
