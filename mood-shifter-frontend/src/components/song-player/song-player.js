import React, { useState, useRef, useEffect } from 'react';
import PreviousButton from './playbar-buttons/previous';
import PlayButton from './playbar-buttons/play-pause';
import NextButton from './playbar-buttons/next';
import ProgressBar from './playbar-buttons/progress-bar';
import SongDetails from './playbar-buttons/song-details';
import './song-player.css';

function SongPlayerScreen({ navigation }) {
  const [url, setUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = {
    title: 'Bloop',
    artist: 'Bleep',
    albumCover: 'https://via.placeholder.com/60x60',
  };

  const audioEl = useRef(null);

  
  useEffect(() => {
    if (audioEl.current) {
      audioEl.current.addEventListener('loadedmetadata', () => {
        setDuration(audioEl.current.duration);
      });
      audioEl.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioEl.current.currentTime);
      });
    }
  }, []);

  const handleSeek = (seekTime) => {
    if (audioEl.current) {
      // Pause the audio
      audioEl.current.pause();
  
      // Add a brief delay (e.g., 100 milliseconds) before seeking and resuming playback
      setTimeout(() => {
        audioEl.current.currentTime = seekTime; // Set the new playback time
        audioEl.current.play(); // Resume playback
      }, 100); // Adjust the delay duration as needed
    }
  };
  
  function onPreviousSong() {
    // Implement previous song logic here
  }

  function onNextSong() {
    // Implement next song logic here
  }

  function onPauseOrPlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
    setIsPlaying(!isPlaying);
  }

  function playAudio() {
    if (audioEl.current) {
      audioEl.current.play();
    }
  }

  function pauseAudio() {
    if (audioEl.current) {
      audioEl.current.pause();
    }
  }

  return (
    <div className="playbar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <SongDetails song={song}></SongDetails>
      <ProgressBar progress={currentTime} songLength={duration} onSeek={handleSeek}></ProgressBar>
      <div className="playbar-controls">
        <PreviousButton
          className="playbar-control-button"
          onClick={onPreviousSong}
        >
          Previous
        </PreviousButton>
        <PlayButton
          isPlaying={isPlaying}
          onClick={onPauseOrPlay}
          className="playbar-control-button"
        >
        </PlayButton>
        <audio
          src={url}
          ref={audioEl}
        >
          Your browser does not support the audio element.
        </audio>
        <NextButton className="playbar-control-button" onClick={onNextSong}></NextButton>
      </div>
    </div>
  );
}

export default SongPlayerScreen;
