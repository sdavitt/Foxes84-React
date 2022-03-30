import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProviderLayer from './ProviderLayer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // importing our router component to add to our application
import { FirebaseAppProvider } from 'reactfire'; // install the tslib package alongside reactfire to avoid the spreadArray error

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe1ty48kE6sGVhhvAhtIIFa6c2dt-LEvE",
  authDomain: "foxes84-react-ecommerce.firebaseapp.com",
  projectId: "foxes84-react-ecommerce",
  storageBucket: "foxes84-react-ecommerce.appspot.com",
  messagingSenderId: "150757047093",
  appId: "1:150757047093:web:6d5e526c7190023c346a7c"
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
