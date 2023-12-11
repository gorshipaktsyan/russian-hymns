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

function AppBarComponent({
  handleDrawerToggle,
  title,
  currentNumber,
  isHymnPage,
}) {
  const [saved, setSaved] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SAVED_HYMNS_LIST = persistentStore.get("savedHymns") || [];
  useEffect(() => {
    setSaved(SAVED_HYMNS_LIST.some((hymn) => hymn.number === currentNumber));
  }, [currentNumber, SAVED_HYMNS_LIST]);

  const handleBookmarkClick = () => {
    if (saved) {
      persistentStore.remove("savedHymns", currentNumber);
      setSaved(!saved);
    } else {
      const currentData = new Date();
      const HYMN_OBJECT = { number: currentNumber, date: currentData };
      const UPDATED_HYMNS = [...SAVED_HYMNS_LIST, HYMN_OBJECT];
      persistentStore.set("savedHymns", UPDATED_HYMNS);
      setSaved(!saved);
    }
  };
  console.log(title);
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
        {isHymnPage ? (
          <IconButton color="inherit" onClick={handleBookmarkClick}>
            {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
