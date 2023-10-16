import React from 'react';
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'

function Song( { songCoverIcon, songTitle, songArtist } ) {
    return (
        <div className='song-item'>
            <div className='song-wrapper'>
                <img className='song-img' alt="" src={songCoverIcon}></img>
                <div className='song-item-title-div'>
                    <h2 className='text-style song-text-title'>{songTitle}</h2>
                    <h3 className='text-style song-text-subtitle'>{songArtist}</h3>
                </div>
            </div>
            <div className='song-wrapper'>
                <p className='song-add-button'>+</p>
            </div>
        </div>
    );
}

export default Song;