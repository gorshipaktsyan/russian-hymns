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

function App({ currentNumber, setCurrentNumber, setTitle, historyUpdated }) {
  const routes = [
    {
      path: "/",
      element: (
        <Hymn
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
        />
      ),
    },
    { path: "/settings", element: <Settings /> },
    { path: "/about", element: <About /> },
    {
      path: "/alphabetical",
      element: (
        <AlphabeticalIndex
          setCurrentNumber={setCurrentNumber}
          setTitle={setTitle}
        />
      ),
    },
    {
      path: "/bookmark",
      element: <Bookmarks setCurrentNumber={setCurrentNumber} />,
    },
    {
      path: "/content",
      element: <Content setCurrentNumber={setCurrentNumber} />,
    },
    {
      path: "/history",
      element: (
        <History
          setCurrentNumber={setCurrentNumber}
          historyUpdated={historyUpdated}
        />
      ),
    },

    { path: "/preface", element: <Preface /> },
    { path: "/reference", element: <Reference /> },
    {
      path: "/search",
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
