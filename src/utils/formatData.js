import { findBy } from "./find";

function formattingDate(date, language) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const dateFormatter = new Intl.DateTimeFormat(language, options);
  return dateFormatter.format(new Date(date));
}

export default function formatData(data, hymns, language) {
  const result = [];

  data.forEach((searched) => {
    const formattedDate = formattingDate(searched.date, language);
    const entry = findBy(result, "date", formattedDate);

    if (!entry) {
      result.push({
        date: formattedDate,
        hymns: [],
      });
    }

    searched.number.forEach((number) => {
      const matchingHymn = findBy(hymns, "number", number);

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
  });
  return result;
}
