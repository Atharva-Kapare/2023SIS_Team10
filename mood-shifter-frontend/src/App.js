import logo from './logo.svg';


import './App.css';
import React from 'react';
import PlayButton from './components/playbar-buttons/play-pause';
const rootElement = document.getElementById("root");

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
        </div>
        <PlayButton  url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></PlayButton>
      </header>
    </div>
  );
}

export default App;
