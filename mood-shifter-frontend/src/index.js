import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/login';
import Authentication from './authentication';
import Navbar from './components/navbar';

const clientId = "8165af06e3a44a32ac86aa3d998761cd";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

function AuthCheck() {
  if (!code) {
      localStorage.clear();
      Authentication.redirectToAuthCodeFlow(clientId);
      } else {
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
          root.render(
            <React.StrictMode>
              <Navbar />
            </React.StrictMode>
          );
        
      };
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default AuthCheck;