import React from 'react';
import RemoveIcon from '../../assets/icons/removeIcon.png';
import TagIcon from '../../assets/icons/tagIcon.png';
import MoreIcon from '../../assets/icons/moreIcon.png';
import './song-list.css'

function Song( { track } ) {
    console.log(track)

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
                <button className="icon-button-style"><img alt="tag" className='icon-style' src={TagIcon}></img></button>
                <button className="icon-button-style"><img alt="remove" className='icon-style' src={RemoveIcon}></img></button>
                <button className="icon-button-style"><img alt="more" className='icon-style' src={MoreIcon}></img></button>
            </div>
        </div>
    );
}

export default Song;