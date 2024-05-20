import findLocation from "./findLocation";
import { setTitle } from "../redux/slice/appBarSlice";

export default function setTitleBy(
  currentNumber,
  pathname,
  hymns,
  dispatch,
  lg
) {
  if (currentNumber.length && pathname === `/hymns/${currentNumber}`) {
    const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
    let newTitle;

    if (currentNumber.length > 1) {
      newTitle = `${lg.hymns} ${currentNumber
        .slice(0, 3)
        .map((number) => " " + number)}${
        currentNumber.length > 3 ? " ..." : ""
      }`;
    } else {
      newTitle = `${lg.hymn} ${currentNumber}<sup>${
        currentHymn?.sign || ""
      }</sup>`;
    }

    dispatch(setTitle(newTitle));
  } else {
    const title = findLocation(pathname, lg);

    if (title) {
      dispatch(setTitle(title));
    }
  }
}
