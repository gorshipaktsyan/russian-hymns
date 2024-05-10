import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/actions";
import { Drawer, AppBar } from "../view/components/index";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import Box from "@mui/material/Box";
import persistentStore from "../view/services/PersistentStore";
import {
  useDoubleTap,
  setTitleBy,
  changeFontSize,
  ScrollToTop,
} from "../utils/index";

function Layout() {
  const [currentNumber, setCurrentNumber] = useState([]);
  const [fontSize, setFontSize] = useState(
    persistentStore.get("settings")?.fontSize || 1
  );
  const [useArrows, setUseArrows] = useState(
    persistentStore.get("settings")?.useArrows || false
  );
  const [englishSearch, setEnglishSearch] = useState(
    persistentStore.get("settings")?.englishSearch || false
  );
  const lg = useSelector((state) => state.hymns.language);
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
    setTitleBy(currentNumber, pathname, navigate, hymns, dispatch, lg);
  }, [currentNumber, pathname]);

  const handleDrawerToggle = (isOpen) => {
    dispatch({ type: actions.SET_DRAWER_OPEN, payload: isOpen });
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} pathname={pathname} />
      <AppBar
        lg={lg}
        handleDrawerToggle={handleDrawerToggle}
        currentNumber={currentNumber}
        pathname={pathname}
      />
      <Drawer
        lg={lg}
        handleDrawerToggle={handleDrawerToggle}
        dispatch={dispatch}
        fontSize={fontSize}
      />
      <Box className="container">
        <App
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
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
