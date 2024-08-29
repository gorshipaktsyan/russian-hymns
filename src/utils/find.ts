import hymnsService from '../services/hymnsService';
import { HymnType, RussianLanguageTypes, SearchedHymns } from '../types';

import createNavItems from './createNavItems';

interface FindTitle {
  currentHymns: HymnType[];
  pathname: string;
  lg: RussianLanguageTypes;
}

function findInStore(hymns: HymnType[], data: SearchedHymns[]): boolean {
  if (data.length && hymns.length) {
    const hymnsNumbers = hymnsService.getHymnsNumbers(hymns);
    const hasNumber = data.some((currentDay) =>
      currentDay.number.some((number: number) => hymnsNumbers.includes(number))
    );
    return hasNumber;
  }
  return false;
}

export default function findTitle({ currentHymns, pathname, lg }: FindTitle): string | null {
  let newTitle;
  const currentHymnNumbers = hymnsService.getHymnsNumbers(currentHymns);
  if (currentHymns.length && pathname === `/hymns/${currentHymnNumbers}`) {
    const currentHymn = hymnsService.findHymn(currentHymnNumbers);

    if (currentHymns.length > 1) {
      newTitle = `${lg.hymns} ${currentHymns.slice(0, 3).map((number) => ' ' + number)}${
        currentHymns.length > 3 ? ' ...' : ''
      }`;
    } else {
      newTitle = `${lg.hymn} ${currentHymnNumbers}<sup>${currentHymn?.sign || ''}</sup>`;
    }

    return newTitle;
  } else {
    const navItems = createNavItems(lg);
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);
    return selectedItem ? selectedItem.title : null;
  }
}

export { findInStore, findTitle };
