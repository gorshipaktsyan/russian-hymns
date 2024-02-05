export default function changeFontSize(className, fontSize) {
  const boxElement = document.querySelector(className);
  if (boxElement) {
    boxElement.style.fontSize = `${fontSize.toFixed(1)}em`;
  }
  return () => {
    if (boxElement) {
      boxElement.style.fontSize = "";
    }
  };
}
