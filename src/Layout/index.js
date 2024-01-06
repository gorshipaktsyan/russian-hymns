import React, { useState } from 'react'
import { AppBar, Drawer } from '../view/components'
import App from '../App'
import ScrollToTop from '../view/components/ScrollToTop'
import Box from '@mui/material/Box'

//let deferredPrompt;

/*window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  alert(`'beforeinstallprompt' event was fired.`);
});*/

const navItems = [
  { tittle: 'Расширенный поиск', route: 'search' },
  { tittle: 'Содержанье', route: 'content' },
  { tittle: 'Алфавитный указатель', route: 'alphabetical' },
  { tittle: 'История', route: 'history' },
  { tittle: 'Закладки', route: 'bookmark' },
  { tittle: 'Предисловие', route: 'preface' },
  { tittle: 'Справка', route: 'reference' },
  /*{ tittle: 'Настройки', route: 'settings' },*/
  { tittle: 'O Программе', route: 'about' }
]

function Layout () {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentNumber, setCurrentNumber] = useState([1])
  const [title, setTitle] = useState(`Гимн ${currentNumber}`)
  const [open, setOpen] = useState(false)
  /*function handlePress() {
   if (deferredPrompt) {
     alert('not found')
     deferredPrompt.prompt()
   } else {
     alert('not found')
   }
 }*/

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }
  const updateCurrentNumber = number => {
    setCurrentNumber(number)
    setTitle(`Гимны ${number.join(',')}`)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <ScrollToTop currentNumber={currentNumber} />
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        title={title}
        currentNumber={currentNumber}
        setCurrentNumber={updateCurrentNumber}
        open={open}
        setOpen={setOpen}
      />
      <App
        open={open}
        currentNumber={currentNumber}
        setCurrentNumber={updateCurrentNumber}
      />
      <Drawer
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setTitle={setTitle}
      />
    </Box>
  )
}
export default Layout
