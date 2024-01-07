import * as React from 'react'
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import persistentStore from '../services/PersistentStore'
import { useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'

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
  const SAVED_HYMNS_LIST = persistentStore.get('savedHymns') || []

  useEffect(() => {
    if (SAVED_HYMNS_LIST.includes(currentNumber[0])) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [currentNumber, SAVED_HYMNS_LIST])

  const handleBookmarkClick = () => {
    if (saved) {
      persistentStore.remove('savedHymns', currentNumber[0])
      setSaved(!saved)
    } else {
      const SAVED_H_NUMBERS = [
        ...new Set([currentNumber[0], ...SAVED_HYMNS_LIST])
      ]
      persistentStore.set('savedHymns', SAVED_H_NUMBERS)
      setSaved(!saved)
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
              {saved ? (
                <BookmarkIcon sx={{ fontSize: '30px' }} />
              ) : (
                <BookmarkBorderIcon sx={{ fontSize: '30px' }} />
              )}
            </IconButton>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent
