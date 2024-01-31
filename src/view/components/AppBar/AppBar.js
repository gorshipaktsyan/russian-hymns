import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import bookmarksStore from "../../services/BookmarksStore";
import ClearIcon from "../../../assets/icons/Clear.png";
import ConfirmModal from "./ConfirmationModal";
import persistentStore from "../../services/PersistentStore";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  IconButton,
  Toolbar,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";

function AppBarComponent({
  handleDrawerToggle,
  title,
  currentNumber,
  setHistoryUpdated,
  isMobile,
}) {
  const [saved, setSaved] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);

  const { pathname } = useLocation();
  const savedHymnsList = bookmarksStore.get();
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;

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
  function handleClearHistory() {
    persistentStore.clear("searchedHymns");
    setHistoryUpdated("true");
    setOpenConfirm(false);
  }
  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          backgroundColor: "black",
          zIndex: 1500,
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
            sx={{ fontSize: "20px", cursor: "default" }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Box
            sx={{
              flexGrow: "1",
            }}
          >
            {!isMobile && pathname !== "/" && <SearchBar />}
          </Box>
          {(pathname === "/hymns" || pathname === "/hymns/") && (
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
          {pathname === "/history" && (
            <DeleteIcon
              sx={{ "&:hover": { color: "grey", cursor: "pointer" } }}
              onClick={() => setOpenConfirm(true)}
            />
          )}
          {openConfirm && (
            <ConfirmModal
              handleClearHistory={handleClearHistory}
              setOpenConfirm={setOpenConfirm}
              openConfirm={openConfirm}
            />
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default AppBarComponent;
