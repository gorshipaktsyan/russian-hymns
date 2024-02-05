import React, { useState, useEffect } from "react";
import Drawer from "../view/components/Drawer";
import AppBar from "../view/components/AppBar/AppBar";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import findLocation, {
  currentNumberStore,
} from "../view/services/LayoutService";
import SearchBar from "../view/components/searchBar/SearchBar";
import persistentStore from "../view/services/PersistentStore";
import { useDoubleTap } from "../utils/DoubleTap";
import changeFontSize from "../utils/changeFontSize";

//let deferredPrompt;

/*window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  alert(`'beforeinstallprompt' event was fired.`);
});*/

const navItems = [
  { title: "Поиск", route: "search" },
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
  const [currentNumber, setCurrentNumber] = useState(() =>
    currentNumberStore.get()
  );
  const [title, setTitle] = useState("Поиск");
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const savedFontSize = persistentStore.get("fontSize");
  const [fontSize, setFontSize] = useState(savedFontSize ? savedFontSize : 1);
  useDoubleTap(setFontSize);

  useEffect(() => {
    changeFontSize(fontSize);
    persistentStore.set("fontSize", Number(fontSize.toFixed(1)));
  }, [fontSize]);
  useEffect(() => {
    if (pathname === "/hymns") {
      currentNumberStore.set(currentNumber);
      const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
      setTitle(
        currentNumber.length > 1
          ? "Гимны"
          : `Гимн ${currentNumber}<sup>${currentHymn?.sign}</sup>`
      );
      return;
    }
    setTitle(() => findLocation(pathname, currentNumber, navItems));
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
        setHistoryUpdated={setHistoryUpdated}
        isMobile={isMobile}
      />
      <Box className="container">
        <App
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          setTitle={setTitle}
          historyUpdated={historyUpdated}
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
