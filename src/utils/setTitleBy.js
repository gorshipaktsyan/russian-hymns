import actions from "../redux/actions/actions";
import findLocation from "./findLocation";

export default function setTitleBy(
  currentNumber,
  pathname,
  navigate,
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
      newTitle = `${lg.hymn} ${currentNumber}<sup>${currentHymn?.sign}</sup>`;
    }
    dispatch({ type: actions.SET_TITLE, payload: newTitle });
  } else if (pathname === "/hymns/" || pathname === "/hymns") {
    navigate("/");
  } else {
    const title = findLocation(pathname, lg);
    if (title) {
      dispatch({ type: actions.SET_TITLE, payload: title });
    }
  }
}
