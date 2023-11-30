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
import { Bookmark } from "@mui/icons-material";
import "./index.scss";

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
