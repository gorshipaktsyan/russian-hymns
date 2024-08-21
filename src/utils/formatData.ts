import { dateOptionsConfig } from '../config';
import { hymnsService } from '../services';
import { RussianLanguageTypes } from '../types';
import FormattedDataType from '../types/formattedDataType';

interface formatDataForBookmarks {
  date: string;
  number: number;
}

interface formatDataForHistory {
  date: string;
  number: number[];
}

function formattingDate(date: string, language: string): string {
  const dateFormatter = new Intl.DateTimeFormat(language, dateOptionsConfig);
  return dateFormatter.format(new Date(date));
}

function formatDataForBookmarks(
  savedHymns: formatDataForBookmarks[],
  language: RussianLanguageTypes
): FormattedDataType[] {
  const result: FormattedDataType[] = [];

  savedHymns.forEach((day) => {
    const formattedDate = formattingDate(day.date, language.language);
    const entry = result.find((d) => d.date === formattedDate);

    if (!entry) {
      result.push({
        date: formattedDate,
        hymns: []
      });
    }

    const matchingHymn = hymnsService.findHymn(day.number);

    if (matchingHymn) {
      const existingEntry = result.find((d) => d.date === formattedDate);

      if (existingEntry) {
        if (Array.isArray(existingEntry.hymns)) {
          existingEntry.hymns.push(matchingHymn);
        } else {
          existingEntry.hymns = [matchingHymn];
        }
      } else {
        result.push({
          date: formattedDate,
          hymns: [matchingHymn]
        });
      }
    }
  });
  return result;
}

function formatDataForHistory(
  searchedHymns: formatDataForHistory[],
  language: RussianLanguageTypes
): FormattedDataType[] {
  const result: FormattedDataType[] = [];

  searchedHymns.forEach((day) => {
    const formattedDate = formattingDate(day.date, language.language);
    const entry = result.find((d) => d.date === formattedDate);

    if (!entry) {
      result.push({
        date: formattedDate,
        hymns: []
      });
    }

    day.number.forEach((number) => {
      const matchingHymn = hymnsService.findHymn(number);

      if (matchingHymn) {
        const existingEntry = result.find((d) => d.date === formattedDate);

        if (existingEntry) {
          if (Array.isArray(existingEntry.hymns)) {
            existingEntry.hymns.push(matchingHymn);
          } else {
            existingEntry.hymns = [matchingHymn];
          }
        } else {
          result.push({
            date: formattedDate,
            hymns: [matchingHymn]
          });
        }
      }
    });
  });
  return result;
}

export { formatDataForBookmarks, formatDataForHistory };
