import '../song-player.css';
import React, { Component } from "react";

const SongDetails = ({ song }) => {
    return (
        <>
        <img className="playbar-album-cover" src={song.albumCover} alt={song.title} />
        <div className="playbar-info">
            <div className="playbar-song-info">
                <p className="playbar-song-title">{song.title}</p>
                <p className="playbar-song-artist">{song.artist}</p>
            </div>
        </div></>
    );
}

export default SongDetails;