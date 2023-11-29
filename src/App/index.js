import React from 'react';
import { Routes, Route } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import { Hymn, Settings } from '../view/pages';
import './indexs.scss';
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

function App() {

   /*function handlePress() {
     if (deferredPrompt) {
       alert('not found')
       deferredPrompt.prompt()
     } else {
       alert('not found')
     }
   }*/

  return (
    <div className='app'>
      <CssBaseline />
      <Routes>
        <Route path="/russian-hymns" element={ <Hymn/> } />
        <Route path="/russian-hymns/settings" element={ <Settings/> } />
      </Routes>
    </div>
  );
}

export default App;
