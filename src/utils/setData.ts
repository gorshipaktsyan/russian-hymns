interface HymnObject {
  date: string;
  number: number[];
}

function setDataForHistory(value: number[] | number): HymnObject {
  const hymnIds = Array.isArray(value) ? value : [value];
  const currentDate = new Date().toISOString();
  const hymnObject = { date: currentDate, number: hymnIds };
  return hymnObject;
}
function setDataForBookmarks(value: number[]): HymnObject {
  const currentDate = new Date().toISOString();
  const hymnObject = { date: currentDate, number: value };
  return hymnObject;
}

export { setDataForBookmarks, setDataForHistory };
