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
import { useDispatch, useSelector } from "react-redux";

const { StyledAlert } = StyledComponents;


function AppBarComponent({ handleDrawerToggle, currentNumber, pathname,language }) {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const drawerOpen = useSelector((state) => state.hymns.drawerOpen);
  const searchedHymnsListOpen = useSelector(
    (store) => store.hymns.searchedHymnsListOpen
  );
  const title = useSelector((state) => state.hymns.title);
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
      return;
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
            onClick={() => handleDrawerToggle(!drawerOpen)}
          >
            <MenuIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <Box
            sx={{
              fontSize: "20px",
              cursor:
                pathname === `/hymns/${currentNumber}` ? "pointer" : "default",
            }}
            dangerouslySetInnerHTML={{ __html: title }}
            onClick={handleTitleClick}
          />
          <Box
            sx={{
              flexGrow: "1",
            }}
          >
            {(pathname !== "/" || searchedHymnsListOpen) && (
              <SearchBar
                searchedHymnsListOpen={searchedHymnsListOpen}
                dispatch={dispatch}
              />
            )}
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
          <StyledAlert>{language.appBar.copyAlert}</StyledAlert>
        </Snackbar>
      )}
    </>
  );
}

export default AppBarComponent;
