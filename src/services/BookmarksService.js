import hymns from "../storage/hymns.json";
import { filterArray } from "../utils/filter";
import { findBy } from "../utils/find";
import persistentStorage from "./PersistentStorage";

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
class BookmarksService {
  set(value) {
    const currentDate = new Date();
    const savedHymnsList = persistentStorage.get(key) || [];
    const hymnObject = { date: currentDate, number: value };
    const updatedHymns = [...new Set([hymnObject, ...savedHymnsList])];
    persistentStorage.set(key, updatedHymns);
    return this.get();
  }
  get() {
    const savedHymns = persistentStorage.get(key) || [];
    const result = [];
    savedHymns.forEach((saved) => {
      const formattedDate = formattingDate(saved.date);
      const entry = findBy(result, "date", formattedDate);

      if (!entry) {
        result.push({
          date: formattedDate,
          hymns: [],
        });
      }

      const matchingHymn = findBy(hymns, "number", saved.number);

      if (matchingHymn) {
        const existingEntry = findBy(result, "date", formattedDate);

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
      const hymns = persistentStorage.get(key) || [];
      const updatedHymns = filterArray(hymns, "number", id, "!==");
      persistentStorage.set(key, updatedHymns);
    } catch (error) {
      console.error(
        `Error removing item ${id} from local storage: ${error.message}`
      );
    }
    return this.get();
  }
}
const bookmarksService = new BookmarksService();

export default bookmarksService;
