import './App.css';
import React from 'react';
import PlaylistOptions from './components/playlist/playlist-options';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Display your Spotify profile data</h1>

          <section id="profile">
          <h2>Logged in as <span id="displayName"></span></h2>
          <span id="avatar"></span>
          <ul>
              <li>User ID: <span id="id"></span></li>
              <li>Email: <span id="email"></span></li>
              <li>Spotify URI: <a id="uri" href="{userData.hrefUri}"> </a></li>
              <li>Link: <a id="url" href="{userData.profileHrefUri}"> </a></li>
              <li>Profile Image: <span id="imgUrl"></span></li>
          </ul>
          </section>
          <PlaylistOptions></PlaylistOptions>
      </div>
      </header>
    </div>
  );
  
    
}

export default App;
