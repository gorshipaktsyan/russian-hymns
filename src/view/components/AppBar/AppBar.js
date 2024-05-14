import * as React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import { Box, IconButton, Snackbar, Toolbar, AppBar } from "@mui/material";
import { Menu, BookmarkBorder, Bookmark } from "@mui/icons-material/";
import { copyToClipboard, StyledComponents } from "../../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { saveHymn, removeHymn } from "../../../redux/slice/bookmarksSlice";

const { StyledAlert } = StyledComponents;

function AppBarComponent({ handleDrawerToggle, currentNumber, pathname, lg }) {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;
  const handleClose = () => setCopyAlert(false);
  const drawerOpen = useSelector((state) => state.drawer.drawerOpen);
  const searchedHymnsListOpen = useSelector(
    (store) => store.search.searchedHymnsListOpen
  );
  const title = useSelector((state) => state.title.title);
  const savedHymnsList = useSelector((state) => state.bookmarks.savedHymns);

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
      dispatch(removeHymn(currentHymnNumber));
      setSaved(false);
    } else {
      dispatch(saveHymn(currentHymnNumber));
      setSaved(true);
    }
  };

  const handleTitleClick = async () => {
    if (pathname === `/hymns/${currentNumber}`) {
      await copyToClipboard(window.location.href);
      setCopyAlert(true);
    }
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
            <Menu sx={{ fontSize: "30px" }} />
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
              <SearchBar dispatch={dispatch} />
            )}
          </Box>
          {pathname.includes(`/hymns`) && (
            <>
              <IconButton color="inherit" onClick={handleBookmarkClick}>
                {currentHymnNumber &&
                  (saved ? (
                    <Bookmark sx={{ fontSize: "30px" }} />
                  ) : (
                    <BookmarkBorder sx={{ fontSize: "30px" }} />
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
          <StyledAlert>{lg.appBar.copyAlert}</StyledAlert>
        </Snackbar>
      )}
    </>
  );
}

export default AppBarComponent;
