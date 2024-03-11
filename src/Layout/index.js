import React, { useState, useEffect } from "react";
import Drawer from "../view/components/Drawer";
import AppBar from "../view/components/AppBar/AppBar";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import findLocation from "../view/services/LayoutService";
import SearchBar from "../view/components/searchBar/SearchBar";
import persistentStore from "../view/services/PersistentStore";
import { useDoubleTap } from "../utils/DoubleTap";
import changeFontSize from "../utils/changeFontSize";

const navItems = [
  { title: "Алфавитный указатель", route: "alphabetical" },
  { title: "Содержание", route: "content" },
  { title: "История", route: "history" },
  { title: "Закладки", route: "bookmark" },
  { title: "Предисловие", route: "preface" },
  { title: "Справка", route: "reference" },
  { title: "O программе", route: "about" },
];
const isMobile = navigator.maxTouchPoints > 0;

function Layout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState("");
  const savedFontSize = persistentStore.get("fontSize");
  const [fontSize, setFontSize] = useState(savedFontSize ? savedFontSize : 1);
  const [currentNumber, setCurrentNumber] = useState([]);
  const navigate = useNavigate();
  useDoubleTap(setFontSize);

  useEffect(() => {
    changeFontSize(fontSize);
    persistentStore.set("fontSize", Number(fontSize.toFixed(1)));
  }, [fontSize]);

  useEffect(() => {
    if (currentNumber.length && pathname === `/hymns/${currentNumber}`) {
      const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
      setTitle(
        currentNumber.length > 1
          ? currentNumber.length > 3
            ? `Гимны ${currentNumber.slice(0, 3)} ...`
            : `Гимны ${currentNumber}`
          : `Гимн ${currentNumber}<sup>${currentHymn?.sign}</sup>`
      );
    } else if (pathname === "/hymns/" || pathname === "/hymns") {
      navigate("/");
      setTitle(() => "Гимны 1-800");
    } else {
      setTitle(() => findLocation(pathname, navItems));
    }
  }, [currentNumber, pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} />
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        title={title}
        currentNumber={currentNumber}
        isMobile={isMobile}
      />
      <Box className="container">
        <App
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          setTitle={setTitle}
        />
      </Box>
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setTitle={setTitle}
      />
      {pathname !== "/" && isMobile && <SearchBar isMobile={isMobile} />}
    </Box>
  );
}
export default Layout;
