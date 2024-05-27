import setFontSize from "./setFontSize";
import copyToClipboard from "./copyToClipboard";
import submit from "./submit";
import createNavItems from "./createNavItems";
import setTitle from "./setTitle";
import StyledComponents from "./sharedStyles";
import { filterArray, filterHymnsByLetter } from "./filter";
import scrollToContentTittle from "./scrollToContentTittle";
import { formatDataForHistory, formatDataforBookmarks } from "./formatData";
import { setDataForHistory, setDataForBookmarks } from "./setData";
import showBookmark from "./showBookmark";
import {
  findLocation,
  findBy,
  findHymns,
  findInStore,
  findSearchedNumbers,
} from "./find";
import {
  searchRussianNumber,
  searchEnglishNumber,
  searchHymnsByText,
} from "./search";

export {
  copyToClipboard,
  setFontSize,
  submit,
  createNavItems,
  setTitle,
  StyledComponents,
  filterHymnsByLetter,
  filterArray,
  scrollToContentTittle,
  showBookmark,
  formatDataForHistory,
  formatDataforBookmarks,
  setDataForHistory,
  setDataForBookmarks,
  findLocation,
  findBy,
  findHymns,
  findInStore,
  findSearchedNumbers,
  searchRussianNumber,
  searchEnglishNumber,
  searchHymnsByText,
};
