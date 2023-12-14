import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import persistentStore from "../services/PersistentStore";
import { useLocation } from "react-router-dom";

function AppBarComponent({ handleDrawerToggle, title, currentNumber }) {
  const [saved, setSaved] = useState();
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SAVED_HYMNS_LIST = persistentStore.get("savedHymns") || [];
  useEffect(() => {
    if (SAVED_HYMNS_LIST.includes(currentNumber)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [currentNumber]);

  const handleBookmarkClick = () => {
    if (saved) {
      persistentStore.remove("savedHymns", currentNumber);
      setSaved(!saved);
    } else {
      const SAVED_H_NUMBERS = [
        ...new Set([currentNumber, ...SAVED_HYMNS_LIST]),
      ];
      persistentStore.set("savedHymns", SAVED_H_NUMBERS);
      setSaved(!saved);
    }
  };
  return (
    <AppBar component="nav" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Box>{title}</Box>
        <Box sx={{ flexGrow: 1 }} />
        {location.pathname === "/russian-hymns" ? (
          <IconButton color="inherit" onClick={handleBookmarkClick}>
            {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
