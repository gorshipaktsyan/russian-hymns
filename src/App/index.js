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
import StyledApp from "./styles";

function App({ open, currentNumber, setCurrentNumber, setTitle }) {
  const routes = [
    {
      path: "/russian-hymns",
      element: (
        <Hymn
          open={open}
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
        />
      ),
    },
    { path: "/russian-hymns/settings", element: <Settings /> },
    { path: "/russian-hymns/about", element: <About /> },
    {
      path: "/russian-hymns/alphabetical",
      element: (
        <AlphabeticalIndex
          setCurrentNumber={setCurrentNumber}
          setTitle={setTitle}
        />
      ),
    },
    {
      path: "/russian-hymns/bookmark",
      element: <Bookmarks setCurrentNumber={setCurrentNumber} />,
    },
    {
      path: "/russian-hymns/content",
      element: <Content setCurrentNumber={setCurrentNumber} />,
    },
    {
      path: "/russian-hymns/history",
      element: <History setCurrentNumber={setCurrentNumber} />,
    },

    { path: "/russian-hymns/preface", element: <Preface /> },
    { path: "/russian-hymns/reference", element: <Reference /> },
    {
      path: "/russian-hymns/search",
      element: <Search setCurrentNumber={setCurrentNumber} />,
    },
  ];

  return (
    <StyledApp>
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </StyledApp>
  );
}

export default App;
