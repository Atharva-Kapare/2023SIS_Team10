import React from 'react';
import './Playbar.css';
import PlayButton from '../playbar-buttons/play-pause';
import PreviousButton from '../playbar-buttons/previous';
import NextButton from '../playbar-buttons/next';

const Playbar = ({ song }) => {
  return (
    <div className="playbar">
        <img className="playbar-album-cover" src={song.albumCover} alt={song.title} />
      <div className="playbar-info">
        <div className="playbar-song-info">
          <p className="playbar-song-title">{song.title}</p>
          <p className="playbar-song-artist">{song.artist}</p>
        </div>
      </div>
      <div className="playbar-controls">
        <PreviousButton className="playbar-control-button">Previous</PreviousButton>
        <PlayButton  className="playbar-control-button" url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></PlayButton>
        <NextButton className="playbar-control-button">Next</NextButton>
      </div>
      <div className="playbar-progress">
        <div className="playbar-progress-bar" style={{ width: `${song.progress}%` }}></div>
      </div>
    </div>
  );
};

export default Playbar;