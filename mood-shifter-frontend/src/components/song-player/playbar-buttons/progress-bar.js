import React from 'react';
import '../song-player.css';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  return formattedTime;
}

const ProgressBar = ({ progress, songLength, onSeek }) => {
  const handleProgressBarClick = (e) => {
    const progressBar = e.target;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickPositionX / progressBarWidth) * songLength;
    onSeek(seekTime);
  };

  return (
    <>
      <div className='playbar-progress-container'>
        <div className='playbar-progress' onClick={handleProgressBarClick}>
          <div className="playbar-progress-bar" style={{ width: `${(progress / songLength) * 100}%` }}></div>
        </div>
        <div className='playbar-duration'>
          <div dateTime="15:20" className="playbar-progress-text">{formatTime(progress)}</div>
          <div dateTime="15:20" className="playbar-progress-text">{formatTime(songLength)}</div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
