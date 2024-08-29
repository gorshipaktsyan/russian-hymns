import { hymnsService } from '../services';
import { HymnType } from '../types';

interface HymnObjectForHistory {
  date: string;
  number: number[];
}
interface HymnObjectForBookmarks {
  date: string;
  number: number;
}
function setDataForHistory(hymns: HymnType[] | number): HymnObjectForHistory {
  const hymnsNumbers = Array.isArray(hymns) ? hymnsService.getHymnsNumbers(hymns) : [hymns];
  const currentDate = new Date().toISOString();
  const hymnObject = { date: currentDate, number: hymnsNumbers };
  return hymnObject;
}
function setDataForBookmarks(value: number): HymnObjectForBookmarks {
  const currentDate = new Date().toISOString();
  const hymnObject = { date: currentDate, number: value };
  return hymnObject;
}

export { setDataForBookmarks, setDataForHistory };
