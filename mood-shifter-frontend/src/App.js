import logo from './logo.svg';
import './App.css';
import React from 'react';
import PlayButton from './components/playbar-buttons/play-pause';
import Playbar from './components/playbar/Playbar';
import PlaylistOptions from './components/playlist/playlist-options';

const rootElement = document.getElementById("root");

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Display your Spotify profile data</h1>
          <section id="profile">
          <h2>Logged in as <span id="displayName"></span></h2>
          <span id="avatar"></span>
          </section>
          <PlaylistOptions></PlaylistOptions>
        </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        {/* <Playbar song={song} /> */}
      </header>
    </div>
  );
}

export default App;
