import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authentication from './authentication';

const clientId = "bf93ef9d71614b5392aa6528ba81510a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

if (!code) {
  Authentication.redirectToAuthCodeFlow(clientId);
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  window.onload = async function runAuth() {
    accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = await Authentication.getAccessToken(clientId, code);
      localStorage.setItem("accessToken", accessToken);
    }
    const profile = await Authentication.fetchProfile(accessToken);
    const likedSongs = await Authentication.getLikedSongs(accessToken);
    console.log(profile);
    console.log(likedSongs);
    Authentication.populateUI(profile);
  };
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
