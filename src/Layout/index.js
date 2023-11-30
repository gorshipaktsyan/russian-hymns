import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useSwipeable } from "react-swipeable";
import AppBar from "../view/components/AppBar";
import Drawer from "../view/components/Drawer";
import Footer from "../view/components/Footer";
import storage from "../view/services/storage/storage.json";
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
const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [number, setNumber] = useState(1);
  const [tittle, setTittle] = useState("Гимны (1-800)");
  function handleLeftSwipe() {
    const index = storage.findIndex(
      (el) => Number(el.number) === Number(number + 1)
    );
    if (index > 0) {
      setNumber(number + 1);
    }
  }

  function handleRightSwipe(n) {
    const index = storage.findIndex(
      (el) => Number(el.number) === Number(number - 1)
    );
    if (index > 0) {
      setNumber(number - 1);
    }
  }

  const handlers = useSwipeable(
    {
      onSwipedLeft: () => handleLeftSwipe(),
      onSwipedRight: () => handleRightSwipe(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true,
    },
    config
  );

  /*function handlePress() {
   if (deferredPrompt) {
     alert('not found')
     deferredPrompt.prompt()
   } else {
     alert('not found')
   }
 }*/

  /*    const toggleMobileMenu = () => {
          setMobileMenuOpen(!isMobileMenuOpen);
      };*/

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  return (
    <Box sx={{ height: "100%" }} {...handlers}>
      <AppBar handleDrawerToggle={handleDrawerToggle} tittle={tittle} />
      <App number={number} />
      <Footer />
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setTittle={setTittle}
      />
    </Box>
  );
}
export default Layout;
