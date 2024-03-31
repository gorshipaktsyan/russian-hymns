import { useEffect } from "react";

const minFontSize = 1.0;
const maxFontSize = 1.8;
const doubleTapDelay = 300;
const clickedPlace = window.innerWidth / 2;
let lastClickTime = 0;

export default function doubleTap(e, setFontSize) {
  e.preventDefault();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastClickTime;

  if (timeDifference <= doubleTapDelay) {
    e.clientX < clickedPlace
      ? setFontSize((prevSize) => Math.max(prevSize - 0.1, minFontSize))
      : setFontSize((prevSize) => Math.min(prevSize + 0.1, maxFontSize));
    lastClickTime = 0;
  } else {
    lastClickTime = currentTime;
  }
}
export function useDoubleTap(setFontSize) {
  useEffect(() => {
    if (!setFontSize) {
      return;
    }
    const handleClick = (e) => doubleTap(e, setFontSize);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setFontSize]);
}
