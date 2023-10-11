//this component is the add button for making new playlists

import React from 'react';
import add from '../../assets/add.png';

import './playlist.css';

function AddPlaylistButton(){
    return <img src={add} className="add-playlist-button" alt="add"/>
}

export default AddPlaylistButton;