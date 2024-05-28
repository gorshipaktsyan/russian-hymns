import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, AppBar, ScrollToTop } from "../view/components/index";
import App from "../App";
import Box from "@mui/material/Box";
import { setFontSize, findTitle } from "../utils";
import { useDoubleTap } from "../utils/hooks";
import { setAppBarTitle } from "../redux/slice/appBarSlice";

function Layout() {
  const settings = useSelector((state) => state.settings);
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const hymns = useSelector((state) => state.hymns.hymns);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useDoubleTap(pathname, dispatch, settings.fontSize);

  useEffect(() => {
    setFontSize(settings.fontSize);
  }, [settings.fontSize]);

  useEffect(() => {
    const title = findTitle(currentNumber, pathname, hymns, settings.language);
    dispatch(setAppBarTitle(title));
  }, [currentNumber, pathname, dispatch, settings.language, hymns]);

  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} pathname={pathname} />
      <AppBar lg={settings.language} />
      <Drawer
        lg={settings.language}
        dispatch={dispatch}
        fontSize={settings.fontSize}
      />
      <Box className="container">
        <App />
      </Box>
    </Box>
  );
}
export default Layout;
