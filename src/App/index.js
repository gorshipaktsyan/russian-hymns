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

function App({
  currentNumber,
  setCurrentNumber,
  setTitle,
  fontSize,
  setFontSize,
  useArrows,
  setUseArrows,
}) {
  const routes = [
    {
      path: "/",
      element: <Search setCurrentNumber={setCurrentNumber} />,
    },
    {
      path: "/hymns/:number",
      element: (
        <Hymn
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          useArrows={useArrows}
        />
      ),
    },
    {
      path: "/settings",
      element: (
        <Settings
          fontSize={fontSize}
          setFontSize={setFontSize}
          useArrows={useArrows}
          setUseArrows={setUseArrows}
        />
      ),
    },
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
      element: <History setCurrentNumber={setCurrentNumber} />,
    },
    { path: "/preface", element: <Preface /> },
    { path: "/reference", element: <Reference /> },
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
