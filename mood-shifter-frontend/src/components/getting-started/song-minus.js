import React from 'react';

function SongMinus( { track } ) {

    return (
        <div className='song-item'>
            <div className='song-wrapper'>
                <img className='song-img' alt="" src={track.cover}></img>
                <div className='song-item-title-div'>
                    <h2 className='text-style song-text-title'>{track.title}</h2>
                    <h3 className='text-style song-text-subtitle'>{track.artist}</h3>
                </div>
            </div>
            <div className='song-wrapper'>
                <p className='song-add-button'>-</p>
            </div>
        </div>
    );
}

export default SongMinus;