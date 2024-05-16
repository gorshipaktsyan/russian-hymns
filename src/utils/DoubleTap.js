import { changeFontSize } from "../redux/slice/settingsSlice";

const minFontSize = 1.0;
const maxFontSize = 1.8;
const doubleTapDelay = 300;
const clickedPlace = window.innerWidth / 2;
let lastClickTime = 0;

export default function doubleTap(e, dispatch, fontSize) {
  e.preventDefault();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastClickTime;

  if (timeDifference <= doubleTapDelay) {
    e.clientX < clickedPlace
      ? dispatch(changeFontSize(Math.max(fontSize - 0.1, minFontSize)))
      : dispatch(changeFontSize(Math.min(fontSize + 0.1, maxFontSize)));
    lastClickTime = 0;
  } else {
    lastClickTime = currentTime;
  }
}
