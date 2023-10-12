//this .js will be the component used repeatedly to show playlists name

import React from 'react';

import './playlist.css';

function PlaylistName(name){
    return <div className="playlist-name">{name}</div>
}

export default PlaylistName;