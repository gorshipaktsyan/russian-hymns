import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  About,
  AlphabeticalIndex,
  Bookmarks,
  Content,
  History,
  Hymn,
  Preface,
  Reference,
  Search,
  Settings,
} from "../view/pages";
import "./index.scss";

function App({ currentNumber, setCurrentNumber, setIsHymnPage
}) {
  const routes = [
    {
      path: "/russian-hymns",
      element: (
        <Hymn
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          setIsHymnPage={setIsHymnPage}

        />
      ),
    },
    { path: "/russian-hymns/settings", element: <Settings /> },
    { path: "/russian-hymns/about", element: <About /> },
    {
      path: "/russian-hymns/alphabetical",
      element: <AlphabeticalIndex setCurrentNumber={setCurrentNumber} setIsHymnPage={setIsHymnPage}
      />,
    },
    {
      path: "/russian-hymns/bookmark",
      element: <Bookmarks setCurrentNumber={setCurrentNumber} setIsHymnPage={setIsHymnPage}
      />,
    },
    {
      path: "/russian-hymns/content",
      element: <Content setCurrentNumber={setCurrentNumber} setIsHymnPage={setIsHymnPage}
      />,
    },
    {
      path: "/russian-hymns/history",
      element: <History setCurrentNumber={setCurrentNumber} setIsHymnPage={setIsHymnPage}
      />,
    },

    { path: "/russian-hymns/preface", element: <Preface /> },
    { path: "/russian-hymns/reference", element: <Reference /> },
    {
      path: "/russian-hymns/search",
      element: <Search setCurrentNumber={setCurrentNumber} setIsHymnPage={setIsHymnPage}
      />,
    },
  ];

  return (
    <div className="app">
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
