import React, { useState, useEffect } from "react";
import { AppBar, Drawer } from "../view/components";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import findLocation from "../view/services/LayoutService";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

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
  { title: "Расширенный поиск", route: "search" },
  { title: "Содержание", route: "content" },
  { title: "Алфавитный указатель", route: "alphabetical" },
  { title: "История", route: "history" },
  { title: "Закладки", route: "bookmark" },
  { title: "Предисловие", route: "preface" },
  { title: "Справка", route: "reference" },
  { title: "O Программе", route: "about" },
];

function Layout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentNumber, setCurrentNumber] = useState([1]);
  const [title, setTitle] = useState(() => findLocation(pathname, currentNumber, navItems));
  const [open, setOpen] = useState(false);

  /*function handlePress() {
   if (deferredPrompt) {
     alert('not found')
     deferredPrompt.prompt()
   } else {
     alert('not found')
   }
 }*/
  useEffect(() => {
    if (pathname === "/russian-hymns") {
      const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
      setTitle(
        currentNumber.length > 1
          ? "Гимны"
          : `Гимн ${currentNumber}<sup>${currentHymn?.sign}</sup>`
      );
    }
  }, [currentNumber]);

useEffect(()=> {
setTitle(() => findLocation(pathname, currentNumber, navItems))
},[pathname])

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
        setCurrentNumber={setCurrentNumber}
        open={open}
        setOpen={setOpen}
      />
      <App
        open={open}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
        setTitle={setTitle}
      />
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setTitle={setTitle}
      />
    </Box>
  );
}
export default Layout;
