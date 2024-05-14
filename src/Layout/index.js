import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../redux/slice/drawerSlice";
import { Drawer, AppBar } from "../view/components/index";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import Box from "@mui/material/Box";
import persistentStore from "../view/services/stores/PersistentStore";
import {
  useDoubleTap,
  setTitleBy,
  changeFontSize,
  ScrollToTop,
} from "../utils/index";

function Layout() {
  const [fontSize, setFontSize] = useState(
    persistentStore.get("settings")?.fontSize || 1
  );
  const [useArrows, setUseArrows] = useState(
    persistentStore.get("settings")?.useArrows || false
  );
  const [englishSearch, setEnglishSearch] = useState(
    persistentStore.get("settings")?.englishSearch || false
  );
  const settings = useSelector((state) => state.settings);
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useDoubleTap(pathname !== "/settings" ? setFontSize : undefined);

  useEffect(() => {
    changeFontSize(fontSize);
    const settings = {
      fontSize: Number(fontSize.toFixed(1)),
      useArrows,
      englishSearch,
    };
    persistentStore.set("settings", settings);
  }, [fontSize, useArrows, englishSearch]);

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
    dispatch(setOpenDrawer(isOpen));
  };
  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} pathname={pathname} />
      <AppBar
        lg={settings.language}
        handleDrawerToggle={handleDrawerToggle}
        currentNumber={currentNumber}
        pathname={pathname}
      />
      <Drawer
        lg={settings.language}
        handleDrawerToggle={handleDrawerToggle}
        dispatch={dispatch}
        fontSize={fontSize}
      />
      <Box className="container">
        <App
          fontSize={fontSize}
          setFontSize={setFontSize}
          useArrows={useArrows}
          setUseArrows={setUseArrows}
          englishSearch={englishSearch}
          setEnglishSearch={setEnglishSearch}
        />
      </Box>
    </Box>
  );
}
export default Layout;
