import hymnsService from '../services/hymnsService';
import { HymnType, RussianLanguageTypes } from '../types';

interface FilteredHymns {
  filteredHymns: HymnType[];
}

interface FilterProps extends FilteredHymns {
  letter: string;
  language: RussianLanguageTypes;
}

export default function filterAndSortHymnsByLetter({ letter, language }:FilterProps): HymnType[] {
  const filteredHymns = hymnsService.filterHymnsByLetter(letter);
  const mappedHymns = mapHymns({ filteredHymns, letter, language });

  const sortedHymns = hymnsService.sortHymns(mappedHymns, language.language);
  return sortedHymns;
}

function mapHymns({ filteredHymns, letter, language }: FilterProps): HymnType[] {
  return filteredHymns.map((hymn) => {
    const isFirstLetterMatch = hymn.first_letter === letter;
    const filteredText = removeSymbols(
      isFirstLetterMatch ? hymn.first_string : hymn.chorus_first_string,
      language
    );

    return {
      ...hymn,
      filteredByFirstLetter: isFirstLetterMatch,
      filteredText
    };
  });
}

function removeSymbols(text: string, language: RussianLanguageTypes): string {
  return text.replace(language.regExp.onlyLetters, '');
}
