export default function setData(value) {
  const hymnIds = Array.isArray(value) ? value : [value];
  const currentDate = new Date().toISOString();
  const hymnObject = { date: currentDate, number: hymnIds };
  return hymnObject;
}
