import React from "react";
import { Routes, Route } from "react-router-dom";
import { Bookmark } from "@mui/icons-material";
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
import "./index.scss";

function App({ currentNumber, setCurrentNumber }) {
  const routes = [
    {
      path: "/russian-hymns",
      element: (
        <Hymn
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
        />
      ),
    },
    { path: "/russian-hymns/settings", element: <Settings /> },
    { path: "/russian-hymns/about", element: <About /> },
    { path: "/russian-hymns/alphabetical", element: <AlphabeticalIndex /> },
    { path: "/russian-hymns/bookmark", element: <Bookmark /> },
    {
      path: "/russian-hymns/content",
      element: <Content setCurrentNumber={setCurrentNumber} />
    },
    { path: "/russian-hymns/history", element: <History setCurrentNumber={setCurrentNumber} /> },

    { path: "/russian-hymns/preface", element: <Preface /> },
    { path: "/russian-hymns/reference", element: <Reference /> },
    {
      path: "/russian-hymns/search",
      element: <Search setCurrentNumber={setCurrentNumber} />,
    },
  ];

  return (
    <div className="app">
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
