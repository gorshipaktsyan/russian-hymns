import { Box, IconButton, Toolbar } from "@mui/material";
import { Menu, BookmarkBorder, Bookmark } from "@mui/icons-material/";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveHymn, removeHymn } from "../../../redux/slice/bookmarksSlice";
import { copyToClipboard } from "../../../utils/index";

export default function ToolBar({
  handleDrawerToggle,
  saved,
  setSaved,
  currentHymnNumber,
  currentNumber,
  setCopyAlert,
}) {
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const isSearchedHymnsListOpen = useSelector(
    (store) => store.search.isSearchedHymnsListOpen
  );
  const title = useSelector((state) => state.appBar.title);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => handleDrawerToggle(!isDrawerOpen)}
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
              (saved ? (
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
