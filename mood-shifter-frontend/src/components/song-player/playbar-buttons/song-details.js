import '../song-player.css';
import React, { Component } from "react";

const SongDetails = ({ track }) => {
    return (
        <>
        <img className="playbar-album-cover" src={track?.image ?? ''} />
        <div className="playbar-info">
            <div className="playbar-song-info">
                <p className="playbar-song-title">{track?.name ?? ''}</p>
                <p className="playbar-song-artist">{track?.artists[0]?.name ?? ''}</p>
            </div>
        </div></>
    );
}

export default SongDetails;