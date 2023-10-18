//this .js will be the component used repeatedly to show playlists name

import React from 'react';

import './playlist.css';

function Playlist( {playlist} ){

    return (
        <div>
            <div className="playlist-cover" style={{background:`${playlist.color}`}}></div>
        </div>
    );
}

export default Playlist;