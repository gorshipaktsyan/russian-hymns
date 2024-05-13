import persistentStore from "../../view/services/stores/PersistentStore";
import hymns from "../../view/services/storage/hymns.json";

function formattingDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const dateFormatter = new Intl.DateTimeFormat("ru", options);
  return dateFormatter.format(new Date(date));
}
const key = "savedHymns";

function getSavedHymns() {
  const savedHymns = persistentStore.get(key) || [];
  const result = [];
  savedHymns.forEach((saved) => {
    const formattedDate = formattingDate(saved.date);
    const entry = result.find((item) => item.date === formattedDate);
    if (!entry) {
      result.push({
        date: formattedDate,
        hymns: [],
      });
    }
    const matchingHymn = hymns.find((h) => h.number === saved.number);
    if (matchingHymn) {
      const existingEntry = result.find((item) => item.date === formattedDate);
      if (existingEntry) {
        if (Array.isArray(existingEntry.hymns)) {
          existingEntry.hymns.push(matchingHymn);
        } else {
          existingEntry.hymns = [matchingHymn];
        }
      } else {
        result.push({
          date: formattedDate,
          hymns: [matchingHymn],
        });
      }
    }
  });
  return result;
}

const savedHymnsInitState = getSavedHymns();
export default savedHymnsInitState;
