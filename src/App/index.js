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
  fontSize,
  setFontSize,
  useArrows,
  setUseArrows,
  englishSearch,
  setEnglishSearch,
}) {
  const routes = [
    {
      path: "/",
      element: <Search englishSearch={englishSearch} />,
    },
    {
      path: "/hymns/:number",
      element: <Hymn useArrows={useArrows} />,
    },
    {
      path: "/settings",
      element: (
        <Settings
          fontSize={fontSize}
          setFontSize={setFontSize}
          useArrows={useArrows}
          setUseArrows={setUseArrows}
          englishSearch={englishSearch}
          setEnglishSearch={setEnglishSearch}
        />
      ),
    },
    { path: "/about", element: <About /> },
    {
      path: "/alphabetical",
      element: <AlphabeticalIndex />,
    },
    {
      path: "/bookmark",
      element: <Bookmarks />,
    },
    {
      path: "/content",
      element: <Content fontSize={fontSize} />,
    },
    {
      path: "/history",
      element: <History />,
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
