import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  About,
  AlphabeticalIndex,
  Content,
  History,
  Hymn,
  Preface,
  Reference,
  Search,
  Settings,
} from "../view/pages";
import "./indexs.scss";
import { Bookmark } from "@mui/icons-material";
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

function App({ number }) {
  const routes = [
    { path: "/russian-hymns", element: <Hymn /> },
    { path: "/russian-hymns/settings", element: <Settings /> },
    { path: "/russian-hymns/about", element: <About /> },
    { path: "/russian-hymns/alphabetical", element: <AlphabeticalIndex /> },
    { path: "/russian-hymns/bookmark", element: <Bookmark /> },
    { path: "/russian-hymns/content", element: <Content /> },
    { path: "/russian-hymns/history", element: <History /> },
    { path: "/russian-hymns/preface", element: <Preface /> },
    { path: "/russian-hymns/reference", element: <Reference /> },
    { path: "/russian-hymns/search", element: <Search /> },
  ];
  /*function handlePress() {
     if (deferredPrompt) {
       alert('not found')
       deferredPrompt.prompt()
     } else {
       alert('not found')
     }
   }*/
  return (
    <div className="app">
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={React.cloneElement(route.element, { number })}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
