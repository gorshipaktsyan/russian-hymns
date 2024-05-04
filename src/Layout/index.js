import React, { useState, useEffect } from "react";
import Drawer from "../view/components/Drawer";
import AppBar from "../view/components/AppBar/AppBar";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import findLocation from "../view/services/LayoutService";
import persistentStore from "../view/services/PersistentStore";
import { useDoubleTap } from "../utils/DoubleTap";
import changeFontSize from "../utils/changeFontSize";
import { useDispatch } from "react-redux";
import actions from "../redux/actions/actions";

const navItems = [
  { title: "Гимны 1-800", route: "" },
  { title: "Алфавитный указатель", route: "alphabetical" },
  { title: "Содержание", route: "content" },
  { title: "История", route: "history" },
  { title: "Закладки", route: "bookmark" },
  { title: "Предисловие", route: "preface" },
  { title: "Справка", route: "reference" },
  { title: "O приложении", route: "about" },
  { title: "Настройки", route: "settings" },
];

function Layout() {
  const [title, setTitle] = useState("");
  const savedFontSize = persistentStore.get("settings")?.fontSize;
  const arrows = persistentStore.get("settings")?.useArrows;
  const engSearch = persistentStore.get("settings")?.englishSearch;
  const [fontSize, setFontSize] = useState(savedFontSize ? savedFontSize : 1);
  const [useArrows, setUseArrows] = useState(arrows || false);
  const [englishSearch, setEnglishSearch] = useState(engSearch || false);
  const [settings, setSettings] = useState({});
  const [currentNumber, setCurrentNumber] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useDoubleTap(pathname !== "/settings" ? setFontSize : undefined);
  useEffect(() => {
    changeFontSize(fontSize);
    setSettings((prev) => ({
      ...prev,
      fontSize: Number(fontSize.toFixed(1)),
    }));
  }, [fontSize]);

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      useArrows,
    }));
  }, [useArrows]);

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      englishSearch,
    }));
  }, [englishSearch]);

  useEffect(() => {
    persistentStore.set("settings", settings);
  }, [settings]);

  useEffect(() => {
    if (currentNumber.length && pathname === `/hymns/${currentNumber}`) {
      const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
      if (currentNumber.length > 1) {
        setTitle(
          `Гимны ${currentNumber.slice(0, 3).map((number) => " " + number)}${
            currentNumber.length > 3 ? " ..." : ""
          }`
        );
      } else {
        setTitle(`Гимн ${currentNumber}<sup>${currentHymn?.sign}</sup>`);
      }
    } else if (pathname === "/hymns/" || pathname === "/hymns") {
      navigate("/");
    } else {
      const title = findLocation(pathname, navItems);
      if (title) {
        title && setTitle(title);
      }
    }
  }, [currentNumber, pathname]);

  const handleDrawerToggle = (isOpen) => {
    dispatch({ type: actions.SET_DRAWER_OPEN, payload: isOpen });
  };
  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} />
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        title={title}
        currentNumber={currentNumber}
      />
      <Box className="container">
        <App
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          setTitle={setTitle}
          fontSize={fontSize}
          setFontSize={setFontSize}
          useArrows={useArrows}
          setUseArrows={setUseArrows}
          englishSearch={englishSearch}
          setEnglishSearch={setEnglishSearch}
        />
      </Box>
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        setTitle={setTitle}
        fontSize={fontSize}
      />
    </Box>
  );
}
export default Layout;
