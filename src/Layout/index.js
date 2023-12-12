import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "../view/components/AppBar";
import Drawer from "../view/components/Drawer";
import Footer from "../view/components/Footer";
import App from "../App";
import "./index.scss";

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
  { tittle: "Поиск", route: "search" },
  { tittle: "Содержанье", route: "content" },
  { tittle: "Алфавитный указатель", route: "alphabetical" },
  { tittle: "История", route: "history" },
  { tittle: "Закладки", route: "bookmark" },
  { tittle: "Предисловие", route: "preface" },
  { tittle: "Справка", route: "reference" },
  { tittle: "Настройки", route: "settings" },
  { tittle: "O Программе", route: "about" },
];

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [title, setTitle] = useState(`Гимны ${currentNumber}`);
  const [isHymnPage, setIsHymnPage] = useState(true);
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
    setTitle(`Гимны ${number}`);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        title={title}
        currentNumber={currentNumber}
        isHymnPage={isHymnPage}
      />
      <App
        currentNumber={currentNumber}
        setCurrentNumber={updateCurrentNumber}
        setIsHymnPage={setIsHymnPage}
      />
      <Footer />
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setTitle={setTitle}
        setIsHymnPage={setIsHymnPage}
      />
    </Box>
  );
}
export default Layout;
