import * as React from 'react'
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useLocation } from 'react-router-dom'
import SearchBar from './searchBar/SearchBar'
import bookmarksStore from '../services/BookmarksStore'
function AppBarComponent ({
  handleDrawerToggle,
  title,
  currentNumber,
  setCurrentNumber,
  open,
  setOpen
}) {
  const [saved, setSaved] = useState()
  const location = useLocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const savedHymnsList = bookmarksStore.get('savedHymns')
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber : null

  useEffect(() => {
    const isSaved = Object.entries(savedHymnsList).some(([date, hymns]) => {
      return Array.isArray(hymns) && hymns.some(hymn => hymn.number === currentHymnNumber);
    });
  
    setSaved(isSaved);
  }, [currentNumber, savedHymnsList]);

  const handleBookmarkClick = () => {
    if (saved) {
      bookmarksStore.remove('savedHymns', currentHymnNumber)
      setSaved(false)
    } else {
      bookmarksStore.set('savedHymns', currentHymnNumber)
      setSaved(true)
    }
  }
  return (
    <AppBar
      component='nav'
      sx={{
        backgroundColor: 'black'
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
        >
          <MenuIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Box sx={{ fontSize: '20px', cursor: 'default' }}>{title}</Box>
        {location.pathname === '/russian-hymns' ? (
          <>
            <Box
              sx={{
                flexGrow: '1'
              }}
            >
              <SearchBar
                setCurrentNumber={setCurrentNumber}
                open={open}
                setOpen={setOpen}
              />
            </Box>
            <IconButton color='inherit' onClick={handleBookmarkClick}>
              {currentHymnNumber ? (
                saved ? (
                  <BookmarkIcon sx={{ fontSize: '30px' }} />
                ) : (
                  <BookmarkBorderIcon sx={{ fontSize: '30px' }} />
                )
              ) : null}
            </IconButton>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent
