import { useEffect } from "react";
import doubleTap from "../doubleTap";

export default function useDoubleTap(pathname, dispatch, fontSize) {
  useEffect(() => {
    if (!dispatch) {
      return;
    }
    const handleClick = (e) =>
      pathname !== "/settings" && doubleTap(e, dispatch, fontSize);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dispatch, fontSize, pathname]);
}
