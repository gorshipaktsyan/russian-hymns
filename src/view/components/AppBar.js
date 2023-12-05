import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import persistentStore from "../services/PersistentStore";

function AppBarComponent({ handleDrawerToggle, title, currentNumber }) {
  const [saved, setSaved] = useState(true);
  const handleBookmarkClick = () => {
    if (saved) {
      persistentStore.remove("savedHymns");
      setSaved(!saved);
    } else {
      const SAVED_HYMNS = persistentStore.get("savedHymns") || [];
      const SAVED_H_NUMBERS = [...new Set([currentNumber, ...SAVED_HYMNS])];
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
        <IconButton color="inherit" onClick={handleBookmarkClick}>
          {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
