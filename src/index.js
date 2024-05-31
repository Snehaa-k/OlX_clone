import React from 'react';
import ReactDOM from 'react-dom/client';
import { FirebaseContext } from './store/Context'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import {app} from './firebase/config'
import Context from './store/Context';
import Post from './store/Post';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value = {{app}}>
      <Context>
      <App />
    </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);


reportWebVitals();
