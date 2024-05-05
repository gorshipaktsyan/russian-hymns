import { setTitle } from "../redux/actions/actions";
import findLocation from "../view/services/LayoutService";

export default function setTitleBy(
  currentNumber,
  pathname,
  navigate,
  hymns,
  dispatch
) {
  if (currentNumber.length && pathname === `/hymns/${currentNumber}`) {
    const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
    let newTitle;
    if (currentNumber.length > 1) {
      newTitle = `Гимны ${currentNumber
        .slice(0, 3)
        .map((number) => " " + number)}${
        currentNumber.length > 3 ? " ..." : ""
      }`;
    } else {
      newTitle = `Гимн ${currentNumber}<sup>${currentHymn?.sign}</sup>`;
    }
    dispatch(setTitle(newTitle));
  } else if (pathname === "/hymns/" || pathname === "/hymns") {
    navigate("/");
  } else {
    const title = findLocation(pathname);
    if (title) {
      dispatch(setTitle(title));
    }
  }
}
