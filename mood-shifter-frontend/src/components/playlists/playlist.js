//this .js will be the component used repeatedly to show playlists name

import React from 'react';

import './playlist.css';
import PlaylistCover from './playlist-cover';
import PlaylistName from './playlist-name';


function Playlist(color, name){
    return (
        <div> 
            {/* <PlaylistCover
                coverColor = {color}
            />
            <PlaylistName
                name = {name}
            /> */}
        </div>
    );
}

export default Playlist;