//this .js will be the component used repeatedly to show playlists name

import React from 'react';
import LogoIcon from '../../assets/moodshifter-logo-tile.png'
import './playlist.css';

function Playlist( {playlist} ){

    return (
        <div>
            <div className="playlist-cover" style={{background:`${playlist.color}`}}>
                <img className="playlist-logo" alt="" src={LogoIcon}></img>
            </div>
        </div>
    );
}

export default Playlist;