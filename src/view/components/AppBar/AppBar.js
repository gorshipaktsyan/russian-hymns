import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import bookmarksStore from "../../services/BookmarksStore";
import AppBar from "@mui/material/AppBar";
import { Box, IconButton, Snackbar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import copyToClipboard from "../../../utils/copyToClipboard";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledAlert } = StyledComponents;

function AppBarComponent({
  handleDrawerToggle,
  title,
  currentNumber,
  isMobile,
}) {
  const [saved, setSaved] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const { pathname } = useLocation();
  const savedHymnsList = bookmarksStore.get();
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;
  const handleClose = () => setCopyAlert(false);

  useEffect(() => {
    if (currentHymnNumber && savedHymnsList) {
      const isSaved = savedHymnsList.some((day) =>
        day.hymns.some((h) => h.number === currentHymnNumber)
      );
      setSaved(isSaved);
    }
  }, [currentHymnNumber, savedHymnsList]);

  const handleBookmarkClick = () => {
    if (saved) {
      bookmarksStore.remove(currentHymnNumber);
      setSaved(false);
    } else {
      bookmarksStore.set(currentHymnNumber);
      setSaved(true);
    }
  };

  const handleTitleClick = async () => {
    if (!currentNumber.length) {
      return
    }
    await copyToClipboard(window.location.href);
    setCopyAlert(true);
  };

  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          backgroundColor: "black",
          zIndex: 1300,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <Box
            sx={{
              fontSize: "20px",
              cursor: pathname === `/hymns/${currentNumber}` ? "pointer" : "default",
            }}
            dangerouslySetInnerHTML={{ __html: title }}
            onClick={handleTitleClick}
          />
          <Box
            sx={{
              flexGrow: "1",
            }}
          >
            {!isMobile && pathname !== "/" && <SearchBar />}
          </Box>
          {pathname.includes(`/hymns`) && (
            <>
              <IconButton color="inherit" onClick={handleBookmarkClick}>
                {currentHymnNumber &&
                  (saved ? (
                    <BookmarkIcon sx={{ fontSize: "30px" }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: "30px" }} />
                  ))}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {copyAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={copyAlert}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <StyledAlert>Ссылка на этот гимн скопирована.</StyledAlert>
        </Snackbar>
      )}
    </>
  );
}

export default AppBarComponent;
