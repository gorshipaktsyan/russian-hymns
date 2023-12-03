import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function AppBarComponent({ handleDrawerToggle, title }) {
  const saved = true;

  function handleBookmarkClick() {

  }

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
        <IconButton
          color="inherit"
          onClick={handleBookmarkClick}
        >
            {saved ? <BookmarkBorderIcon /> : <BookmarkIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
