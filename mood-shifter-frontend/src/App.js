import logo from './logo.svg';


import './App.css';
import React from 'react';
import PlayButton from './components/playbar-buttons/play-pause';
import Playbar from './components/playbar/Playbar';

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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <Playbar song={song} />
        
      </header>
    </div>
  );
}

export default App;
