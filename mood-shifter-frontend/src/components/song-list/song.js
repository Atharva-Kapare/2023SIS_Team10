import React from 'react';
import RemoveIcon from '../assets/icons/removeIcon.png';
import TagIcon from '../assets/icons/tagIcon.png';
import MoreIcon from '../assets/icons/moreIcon.png';

function Song( { track } ) {

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
                <p className='song-add-button'>+</p>
                <p className='song-add-button'>{TagIcon}</p>
                <p className='song-add-button'>{RemoveIcon}</p>
                <p className='song-add-button'>{MoreIcon}</p>
            </div>
        </div>
    );
}

export default Song;