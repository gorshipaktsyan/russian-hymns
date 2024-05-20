import { useEffect } from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import { Menu, BookmarkBorder, Bookmark } from "@mui/icons-material/";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveHymn, removeHymn } from "../../../redux/slice/bookmarksSlice";
import { copyToClipboard } from "../../../utils/index";
import showBookmark from "../../../utils/showBookmark";
import { setIsSaved } from "../../../redux/slice/appBarSlice";
import { setIsDrawerOpen } from "../../../redux/slice/drawerSlice";

export default function ToolBar({ setCopyAlert }) {
  const currentNumber = useSelector(
    (state) => state.currentNumber.currentNumber
  );
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const isSearchedHymnsListOpen = useSelector(
    (store) => store.search.isSearchedHymnsListOpen
  );
  const title = useSelector((state) => state.appBar.title);
  const savedHymnsList = useSelector((state) => state.bookmarks.savedHymns);
  const isSaved = useSelector((state) => state.appBar.isSaved);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    showBookmark({
      dispatch,
      savedHymnsList,
      currentHymnNumber,
    });
  }, [currentHymnNumber, savedHymnsList, dispatch]);

  const handleBookmarkClick = () => {
    if (isSaved) {
      dispatch(removeHymn(currentHymnNumber));
      dispatch(setIsSaved(false));
    } else {
      dispatch(saveHymn(currentHymnNumber));
      dispatch(setIsSaved(true));
    }
  };

  const handleTitleClick = async () => {
    if (pathname === `/hymns/${currentNumber}`) {
      await copyToClipboard(window.location.href);
      setCopyAlert(true);
    }
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => dispatch(setIsDrawerOpen(!isDrawerOpen))}
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
        {(pathname !== "/" || isSearchedHymnsListOpen) && (
          <SearchBar dispatch={dispatch} />
        )}
      </Box>
      {pathname.includes(`/hymns`) && (
        <>
          <IconButton color="inherit" onClick={handleBookmarkClick}>
            {currentHymnNumber &&
              (isSaved ? (
                <Bookmark sx={{ fontSize: "30px" }} />
              ) : (
                <BookmarkBorder sx={{ fontSize: "30px" }} />
              ))}
          </IconButton>
        </>
      )}
    </Toolbar>
  );
}
