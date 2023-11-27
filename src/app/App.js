import React, {useState, useEffect} from 'react';
import './App.css';
import { useSwipeable } from 'react-swipeable';
import storage from './storage.json'
let deferredPrompt;

const config = {
  delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
  trackTouch: true,                      // track touch input
  trackMouse: false,                     // track mouse input
  rotationAngle: 0,                      // set a rotation angle
  swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  alert(`'beforeinstallprompt' event was fired.`);
});

function App() {
  const [number, setNumber] = useState(1)

  function handleLeftSwipe() {
    const index = storage.findIndex(el => Number(el.number) === Number(number + 1))
    if (index > 0) {
      setNumber(number + 1)
    }
  }

  function handleRightSwipe(n) {
    const index = storage.findIndex(el => Number(el.number) === Number(number - 1))
    if (index > 0) {
      setNumber(number - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleLeftSwipe(),
    onSwipedRight: () => handleRightSwipe(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log(storage)
  const hymn = storage.find(h => Number(h.number) === number)

  function handlePress() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
    }
  }

  return (
    <div className="App" {...handlers}>
      <header>
        <div className="header-content">
          <h1>Hymns (1-800){number}</h1>
          <button onClick={handlePress}>ee</button>
        </div>
      </header>
     <div dangerouslySetInnerHTML={{__html: hymn.html}} />
    </div>
  );
}

export default App;
