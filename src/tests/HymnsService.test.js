import russian from '../config/constants/russian';
import hymnsService from '../services/hymnsService';
import { hymns } from '../storage';

import testConfig from './config/constants';

describe('HymnsService', () => {
  it('should return all hymns', () => {
    const result = hymnsService.get();
    expect(result).toEqual(hymns);
  });

  it('should find a hymn by number', () => {
    const result = hymnsService.findHymn(testConfig.hymnNumber);
    const expected = hymns.find((hymn) => hymn.number === testConfig.hymnNumber);
    expect(result).toEqual(expected);
  });

  it('should find multiple hymns by numbers', () => {
    const result = hymnsService.findHymns(testConfig.hymnsNumbers);
    const expected = testConfig.hymnsNumbers.map((number) =>
      hymns.find((hymn) => hymn.number === number)
    );
    expect(result).toEqual(expected);
  });

  it('should find searched hymns numbers by russian number', () => {
    const result = hymnsService.findSearchedHymns(testConfig.rusNumbers, testConfig.rusSearchName);
    expect(result).toEqual([1, 3]);
  });

  it('should find searched hymns numbers by english number', () => {
    const result = hymnsService.findSearchedHymns(testConfig.engNumbers, testConfig.engSearchName);
    expect(result).toEqual([2, 3]);
  });

  it('should find index of a hymn by number', () => {
    const result = hymnsService.findIndex(testConfig.hymnNumber);
    const expected = hymns.findIndex((h) => h.number === testConfig.hymnNumber);
    expect(result).toEqual(expected);
  });

  it('should return an array of matching hymns by searched text', () => {
    const result = hymnsService.findHymnsWithMatchKey(testConfig.text, russian.regExp.onlyLetters);
    const lowerCaseText = testConfig.text.toLowerCase();
    const regExpOnlyLetters = new RegExp(russian.regExp.onlyLetters, 'g');
    const textWithoutSpacesAndSymbols = lowerCaseText.replace(regExpOnlyLetters, '');

    const expected = hymns
      .map((h) => ({
        ...h,
        matches: h.text
          .toLowerCase()
          .replace(regExpOnlyLetters, '')
          .includes(textWithoutSpacesAndSymbols)
      }))
      .filter((h) => h.matches);

    expect(result).toEqual(expected);
  });

  it('should filter hymns by letter', () => {
    const result = hymnsService.filterHymnsByLetter(testConfig.letterForFiltering);
    const expected = hymns.filter(
      (hymn) =>
        hymn.first_letter === testConfig.letterForFiltering ||
        hymn.first_letter_chorus === testConfig.letterForFiltering
    );
    expect(result).toEqual(expected);
  });

  it('should filter hymns by subtitle', () => {
    const result = hymnsService.filterHymnsBySubId(testConfig.subtitleId);
    const expected = hymns.filter((hymn) => hymn.subtitle === testConfig.subtitleId);
    expect(result).toEqual(expected);
  });

  it('should sort hymns by filtered text', () => {
    const sortedHymns = hymnsService.sortHymns(testConfig.arrayForSorting, russian.language);
    expect(sortedHymns).toEqual(testConfig.expectedSortedArray);
  });

  it('should return undefined for a non-existent hymn', () => {
    const result = hymnsService.findHymn(testConfig.nonExistentHymnNumber);
    expect(result).toBeUndefined();
  });
});
