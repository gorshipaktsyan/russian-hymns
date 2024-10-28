import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './redux/store';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// // Listen for messages from the service worker
navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'NEW_VERSION_AVAILABLE') {
    showUpdateNotification();
  }
});

// Function to show the update notification
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.innerText = 'A new version of this app is available. Please refresh to update.';
  notification.style.position = 'fixed';
  notification.style.bottom = '10px';
  notification.style.right = '10px';
  notification.style.backgroundColor = 'lightblue';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';

  const refreshButton = document.createElement('button');
  refreshButton.innerText = 'Refresh';
  refreshButton.onclick = () => {
    window.location.reload();
  };

  notification.appendChild(refreshButton);
  document.body.appendChild(notification);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
