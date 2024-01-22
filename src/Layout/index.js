import React, { useState } from "react";
import { AppBar, Drawer } from "../view/components";
import App from "../App";
import hymns from "../view/services/storage/hymns.json";
import ScrollToTop from "../view/components/ScrollToTop";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import findLocation from "../view/services/LayoutService";

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
  { title: "Содержанье", route: "content" },
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
  const titleName = findLocation(pathname, currentNumber, navItems);
  const [title, setTitle] = useState(titleName);
  const [open, setOpen] = useState(false);

  /*function handlePress() {
   if (deferredPrompt) {
     alert('not found')
     deferredPrompt.prompt()
   } else {
     alert('not found')
   }
 }*/

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const updateCurrentNumber = (number) => {
    setCurrentNumber(number);
    const currentHymn = hymns.find((h) => currentNumber.includes(h.number));
    setTitle(
      `${
        number.length > 1 ? "Гимны" : "Гимн" + " " + number + currentHymn.sign
      }`
    );
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ScrollToTop currentNumber={currentNumber} />
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        title={title}
        currentNumber={currentNumber}
        setCurrentNumber={updateCurrentNumber}
        open={open}
        setOpen={setOpen}
      />
      <App
        open={open}
        currentNumber={currentNumber}
        setCurrentNumber={updateCurrentNumber}
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
