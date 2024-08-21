import { hymns } from '../storage';
import { HymnType } from '../types';

class HymnsService {
  private hymns: HymnType[];

  constructor() {
    this.hymns = hymns;
  }
  get(): HymnType[] {
    return this.hymns;
  }

  findRandomHymn(): HymnType[] {
    const randomNumber = Math.floor(Math.random() * 800);
    const hymn = hymns.find((h) => h.number === randomNumber);

    if (!hymn) {
      return [hymns[0]];
    }
    return [hymn];
  }

  findHymn(currentNumbers: number[] | number): HymnType | undefined {
    if (Array.isArray(currentNumbers)) {
      return hymns.find((h) => currentNumbers.includes(h.number));
    }
    return hymns.find((h) => h.number === currentNumbers);
  }

  findHymns(currentNumbers: number[]): HymnType[] {
    return currentNumbers.map((number) => this.hymns.find((h) => h.number === number) as HymnType);
  }

  findSearchedHymns(inputtedNumbers: string, property: keyof HymnType): HymnType[] {
    const numbers = new Set(inputtedNumbers.split(',').map((num) => Number(num.trim())));
    return hymns.filter((h) => Array.from(numbers).some((num) => h[property] === num));
  }

  findIndex(hymnNumber: number): number {
    return hymns.findIndex((el) => el.number === hymnNumber);
  }

  findHymnsWithMatchKey(searchedText: string, regExp: string): HymnType[] {
    const lowerCaseText = searchedText.toLowerCase();
    const regExpOnlyLetters = new RegExp(regExp, 'g');
    const textWithoutSpacesAndSymbols = lowerCaseText.replace(regExpOnlyLetters, '');

    if (textWithoutSpacesAndSymbols === '') return [];

    return this.hymns.filter((hymn) =>
      hymn.text.toLowerCase().replace(regExpOnlyLetters, '').includes(textWithoutSpacesAndSymbols)
    );
  }
  filterHymnsByLetter(letter: string): HymnType[] {
    return this.hymns.filter(
      (hymn) =>
        hymn.first_letter === letter ||
        (hymn.first_letter_chorus && hymn.first_letter_chorus === letter)
    );
  }
  filterHymnsBySubId(subtitleId: number): HymnType[] {
    return this.hymns.filter((hymn) => hymn.subtitle === subtitleId);
  }
  sortHymns(hymnsArray: HymnType[], lg: string): HymnType[] {
    return hymnsArray.sort((a, b) =>
      a.text.localeCompare(b.text, lg, {
        sensitivity: 'base'
      })
    );
  }
}

const hymnsService = new HymnsService();

export default hymnsService;
