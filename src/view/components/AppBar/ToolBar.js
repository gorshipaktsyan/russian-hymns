import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Bookmark, BookmarkBorder, Menu } from '@mui/icons-material/';
import { Box, IconButton, Toolbar } from '@mui/material';

import { setIsSaved } from '../../../redux/slice/appBarSlice';
import { removeHymn, saveHymn } from '../../../redux/slice/bookmarksSlice';
import { setIsDrawerOpen } from '../../../redux/slice/drawerSlice';
import {
  copyToClipboard,
  formatDataforBookmarks,
  setDataForBookmarks,
  showBookmark
} from '../../../utils';
import SearchBar from '../SearchBar';

export default function ToolBar({ setCopyAlert }) {
  const currentNumber = useSelector((state) => state.currentNumber.currentNumber);
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const isSearchedHymnsListOpen = useSelector((store) => store.search.isSearchedHymnsListOpen);
  const { title, isSaved } = useSelector((state) => state.appBar);
  const savedHymnsList = useSelector((state) => state.bookmarks.savedHymns);
  const lg = useSelector((state) => state.settings.language);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const formattedData = formatDataforBookmarks(savedHymnsList, lg);
    const isBookmarked = showBookmark({
      formattedData,
      currentHymnNumber
    });
    dispatch(setIsSaved(isBookmarked));
  }, [currentHymnNumber, savedHymnsList, dispatch, lg]);

  function handleBookmarkClick() {
    if (isSaved) {
      dispatch(removeHymn(currentHymnNumber));
      dispatch(setIsSaved(false));
    } else {
      const hymnObject = setDataForBookmarks(currentHymnNumber);
      dispatch(saveHymn(hymnObject));
      dispatch(setIsSaved(true));
    }
  }

  function handleTitleClick() {
    if (pathname.includes(`/hymns`)) {
      copyToClipboard(window.location.href)
        .then(() => {
          setCopyAlert(true);
        })
        .catch((error) => {
          console.error('Error copying to clipboard', error);
        });
    }
  }

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => dispatch(setIsDrawerOpen(!isDrawerOpen))}>
        <Menu sx={{ fontSize: '30px' }} />
      </IconButton>
      <Box
        sx={{
          fontSize: '20px',
          cursor: pathname.includes(`/hymns`) ? 'pointer' : 'default'
        }}
        dangerouslySetInnerHTML={{ __html: title }}
        onClick={handleTitleClick}
      />
      <Box
        sx={{
          flexGrow: '1'
        }}>
        {(pathname !== '/' || isSearchedHymnsListOpen) && <SearchBar dispatch={dispatch} />}
      </Box>
      {pathname.includes(`/hymns`) && (
        <>
          <IconButton color="inherit" onClick={handleBookmarkClick}>
            {currentHymnNumber &&
              (isSaved ? (
                <Bookmark sx={{ fontSize: '30px' }} />
              ) : (
                <BookmarkBorder sx={{ fontSize: '30px' }} />
              ))}
          </IconButton>
        </>
      )}
    </Toolbar>
  );
}
