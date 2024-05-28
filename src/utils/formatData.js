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

function formatDataforBookmarks(data, hymns, language) {
  const result = [];

  data.forEach((day) => {
    const formattedDate = formattingDate(day.date, language.language);
    const entry = findBy(result, "date", formattedDate);

    if (!entry) {
      result.push({
        date: formattedDate,
        hymn: [],
      });
    }

    const matchingHymn = findBy(hymns, "number", day.number);

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
          hymn: [matchingHymn],
        });
      }
    }
  });
  return result;
}

function formatDataForHistory(data, hymns, language) {
  const result = [];

  data.forEach((day) => {
    const formattedDate = formattingDate(day.date, language.language);
    const entry = findBy(result, "date", formattedDate);

    if (!entry) {
      result.push({
        date: formattedDate,
        hymns: [],
      });
    }

    day.number.forEach((number) => {
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

export { formatDataforBookmarks, formatDataForHistory };
