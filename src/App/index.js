import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {
  About,
  AlphabeticalIndex,
  Bookmarks,
  Content,
  History,
  Hymn,
  Preface,
  Reference,
  Search,
  Settings
} from '../view/pages'
import StyledComponents from '../utils/sharedStyles'

const { StyledApp } = StyledComponents

function App ({ open, currentNumber, setCurrentNumber }) {
  const routes = [
    {
      path: '/russian-hymns',
      element: (
        <Hymn
          open={open}
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
        />
      )
    },
    { path: '/russian-hymns/settings', element: <Settings /> },
    { path: '/russian-hymns/about', element: <About /> },
    {
      path: '/russian-hymns/alphabetical',
      element: <AlphabeticalIndex setCurrentNumber={setCurrentNumber} />
    },
    {
      path: '/russian-hymns/bookmark',
      element: <Bookmarks setCurrentNumber={setCurrentNumber} />
    },
    {
      path: '/russian-hymns/content',
      element: <Content setCurrentNumber={setCurrentNumber} />
    },
    {
      path: '/russian-hymns/history',
      element: <History setCurrentNumber={setCurrentNumber} />
    },

    { path: '/russian-hymns/preface', element: <Preface /> },
    { path: '/russian-hymns/reference', element: <Reference /> },
    {
      path: '/russian-hymns/search',
      element: <Search setCurrentNumber={setCurrentNumber} />
    }
  ]

  return (
    <StyledApp>
      <CssBaseline />
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </StyledApp>
  )
}

export default App
