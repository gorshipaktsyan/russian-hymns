import { useEffect } from "react";

function ScrollToTop(currentNumber, pathname) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, currentNumber]);

  return null;
}

export default ScrollToTop;
