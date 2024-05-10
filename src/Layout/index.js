import React, { useState, useEffect } from "react";
import Drawer from "../view/components/Drawer";
import AppBar from "../view/components/AppBar/AppBar";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import persistentStore from "../view/services/PersistentStore";
import { useDoubleTap } from "../utils/DoubleTap";
import changeFontSize from "../utils/changeFontSize";
import russian from "../config/constants/russian";
import { useDispatch } from "react-redux";
import actions from "../redux/actions/actions";
import setTitleBy from "../utils/setTitleBy";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [language, setLanguage] = useState(russian);
  const dispatch = useDispatch();
  
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
    setTitleBy(currentNumber, pathname, navigate, hymns, dispatch,language);
  }, [currentNumber, pathname]);

  const handleDrawerToggle = (isOpen) => {
    dispatch({ type: actions.SET_DRAWER_OPEN, payload: isOpen });
  };
  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} pathname={pathname} />
      <AppBar
        language={language}
        handleDrawerToggle={handleDrawerToggle}
        currentNumber={currentNumber}
        pathname={pathname}
      />
      <Box className="container">
        <App
          language={language}
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
      <Drawer
        language={language}
        handleDrawerToggle={handleDrawerToggle}
        dispatch={dispatch}
        fontSize={fontSize}
      />
    </Box>
  );
}
export default Layout;
