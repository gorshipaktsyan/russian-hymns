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

function App() {
  const routes = [
    {
      path: "/",
      element: <Search />,
    },
    {
      path: "/hymns/:number",
      element: <Hymn />,
    },
    {
      path: "/settings",
      element: <Settings />,
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
      element: <Content />,
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
