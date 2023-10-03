import logo from './logo.svg';
import './App.css';
import React from 'react';
import PlayButton from './components/playbar-buttons/play-pause';
import Playbar from './components/playbar/Playbar';
import PlaylistOptions from './components/playlist/playlist-options';

const rootElement = document.getElementById("root");

function App() {
  const song = {
    title: 'Example Song',
    artist: 'Example Artist',
    albumCover: 'https://via.placeholder.com/60x60', // Replace with your album cover URL
    progress: 40, // Progress in percentage
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Unsure if this is necessary \/ \/ \/ */}
        <Playbar song={song} /> 
        <div>
          <h1>Display your Spotify profile data</h1>
          <section id="profile">
          <h2>Logged in as <span id="displayName"></span></h2>
          <span id="avatar"></span>
          {/* <ul>
              <li>User ID: <span id="id"></span></li>
              <li>Email: <span id="email"></span></li>
              <li>Spotify URI: <a id="uri" href="{userData.hrefUri}"> </a></li>
              <li>Link: <a id="url" href="{userData.profileHrefUri}"> </a></li>
              <li>Profile Image: <span id="imgUrl"></span></li>
          </ul> */}
          </section>
          <PlaylistOptions></PlaylistOptions>
        </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <Playbar song={song} />
      </header>
    </div>
  );
}

export default App;
