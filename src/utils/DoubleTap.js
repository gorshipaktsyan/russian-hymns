import { useEffect } from "react";
import { changeFontSize } from "../redux/slice/settingsSlice";

const minFontSize = 1.0;
const maxFontSize = 1.8;
const doubleTapDelay = 300;
const clickedPlace = window.innerWidth / 2;
let lastClickTime = 0;

export default function doubleTap(e, dispatch) {
  e.preventDefault();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastClickTime;

  if (timeDifference <= doubleTapDelay) {
    e.clientX < clickedPlace
      ? dispatch(
          changeFontSize((prevSize) => Math.max(prevSize - 0.1, minFontSize))
        )
      : dispatch(
          changeFontSize((prevSize) => Math.min(prevSize + 0.1, maxFontSize))
        );
    lastClickTime = 0;
  } else {
    lastClickTime = currentTime;
  }
}
export function useDoubleTap(dispatch) {
  useEffect(() => {
    if (!dispatch) {
      return;
    }
    const handleClick = (e) => doubleTap(e, dispatch);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dispatch]);
}
