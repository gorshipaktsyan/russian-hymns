import hymnsService from '../services/hymnsService';
import { RussianLanguageTypes } from '../types';
import createNavItems from './createNavItems';

interface FindTitle {
  currentHymns: any[]
  pathname: string
  lg: RussianLanguageTypes
}

function findInStore(value: number[], data: any[]): boolean {
  if (data.length && value.length) {
    const hasNumber = data.some((currentDay) =>
      currentDay.number.some((number: number) => value.includes(number))
    );
    return hasNumber;
  }
  return false;
}

export default function findTitle({ currentHymns, pathname, lg }:FindTitle): string | null {
  let newTitle;

  if (currentHymns.length && pathname === `/hymns/${currentHymns}`) {
    const currentHymn = hymnsService.findHymn(currentHymns);

    if (currentHymns.length > 1) {
      newTitle = `${lg.hymns} ${currentHymns.slice(0, 3).map((number) => ' ' + number)}${
        currentHymns.length > 3 ? ' ...' : ''
      }`;
    } else {
      newTitle = `${lg.hymn} ${currentHymns}<sup>${currentHymn?.sign || ''}</sup>`;
    }

    return newTitle;
  } else {
    const navItems = createNavItems(lg);
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);
    return selectedItem ? selectedItem.title : null;
  }
}

export { findInStore, findTitle };
