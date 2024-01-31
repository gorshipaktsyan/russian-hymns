import hymns from "./storage/hymns.json";
import persistentStore from "./PersistentStore";

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
class BookmarksStore {
  set(value) {
    const currentDate = new Date();
    const savedHymnsList = persistentStore.get(key) || [];
    const hymnObject = { date: currentDate, number: value };
    const updatedHymns = [...new Set([hymnObject, ...savedHymnsList])];
    persistentStore.set(key, updatedHymns);
  }
  get() {
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
        const existingEntry = result.find(
          (item) => item.date === formattedDate
        );
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
  remove(id) {
    try {
      const hymns = persistentStore.get(key) || [];
      const updatedHymns = hymns.filter((hymn) => hymn.number !== id);
      persistentStore.set(key, updatedHymns);
    } catch (error) {
      console.error(
        `Error removing item ${id} from local storage: ${error.message}`
      );
    }
  }
}
const bookmarksStore = new BookmarksStore();

export default bookmarksStore;
