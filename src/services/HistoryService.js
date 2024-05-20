import hymns from "../storage/hymns.json";
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
const key = "searchedHymns";
class HistoryService {
  set(value) {
    const hymnIds = Array.isArray(value) ? value : [value];
    const currentDate = new Date();
    const searchedNumbers = persistentStorage.get(key) || [];
    const hymnObject = { date: currentDate, number: hymnIds };
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])];
    persistentStorage.set(key, updatedHymns);
    return this.get();
  }
  get() {
    const history = persistentStorage.get(key) || [];
    const result = [];

    history.forEach((searched) => {
      const formattedDate = formattingDate(searched.date);
      const entry = result.find((item) => item.date === formattedDate);

      if (!entry) {
        result.push({
          date: formattedDate,
          hymns: [],
        });
      }

      searched.number.forEach((number) => {
        const matchingHymn = hymns.find((h) => h.number === number);

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
    });
    return result;
  }
  find(value) {
    const searchedHymns = persistentStorage.get(key);

    if (searchedHymns) {
      const hasNumber = searchedHymns.some((currentDay) =>
        currentDay.number.some((number) => value.includes(number))
      );
      return hasNumber;
    }
    return false;
  }
  clear() {
    persistentStorage.clear(key);
    return [];
  }
}
const historyService = new HistoryService();

export default historyService;
