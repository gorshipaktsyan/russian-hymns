import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawerOpen } from "../redux/slice/drawerSlice";
import { Drawer, AppBar, ScrollToTop } from "../view/components/index";
import App from "../App";
import Box from "@mui/material/Box";
import { setTitleBy, setFontSize } from "../utils/index";
import useDoubleTap from "../utils/hooks/useDoubleTap";

function Layout() {
  const settings = useSelector((state) => state.settings);
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const hymns = useSelector((state) => state.hymns.hymns);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useDoubleTap(pathname, dispatch, settings.fontSize);

  useEffect(() => {
    setFontSize(settings.fontSize);
  }, [settings.fontSize]);

  useEffect(() => {
    setTitleBy(
      currentNumber,
      pathname,
      navigate,
      hymns,
      dispatch,
      settings.language
    );
  }, [currentNumber, pathname, dispatch, settings.language, navigate]);

  const handleDrawerToggle = (isOpen) => {
    dispatch(setIsDrawerOpen(isOpen));
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} pathname={pathname} />
      <AppBar
        lg={settings.language}
        handleDrawerToggle={handleDrawerToggle}
        currentNumber={currentNumber}
      />
      <Drawer
        lg={settings.language}
        handleDrawerToggle={handleDrawerToggle}
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
