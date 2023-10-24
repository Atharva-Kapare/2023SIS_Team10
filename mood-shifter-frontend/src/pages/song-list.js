// Display list of songs for a single playlist - interacts with player screen!!!
import React from "react";
import BackIcon from '../assets/icons/backIcon.png'
import './css/song-list.css'
import SearchIcon from "../assets/icons/search-icon.png";
import ExportIcon from '../assets/icons/exportIcon.png';
import RemoveIcon from '../assets/icons/removeIcon.png';
import TagIcon from '../assets/icons/tagIcon.png';
import MoreIcon from '../assets/icons/moreIcon.png';
import PlayIcon from '../assets/icons/playIcon.png';
import Song from "../components/getting-started/song";

function SongListScreen({ route, navigation }) {
    const { playlistData } = route.params;
    console.log("playlistData: ", playlistData)
    return (
        <div className="song-list-body">    
            <div className="back-icon-div">
                <button className="back-icon-style" onClick={() => {
                    navigation.navigate('PlaylistScreen');
                }}>
                    <img src={BackIcon} alt="back"></img>
                </button>
            </div>
            <div className="header-style">
                <h1 alt="Playlist" className="title-style">{ playlistData.mood } Playlist</h1>
                <img alt="Search Song" src={SearchIcon}></img>
            </div>
            <div className="header-style">
                <img className="icon-style-large" alt="Play Song" src={PlayIcon}></img>
                <img className="icon-style-small" alt="Eport Playlist" src={ExportIcon}></img>
            </div>

            {/* Song List */}
            <div className="song-list-display">
                {playlistData.songs.map(song => (
                    <div>
                        {/* <Song
                            key={song}
                            track={song}
                        ></Song> */}
                        <p style={{color: "#ffffff"}}>{song}</p>
                    </div>
                ))}
            </div>
            {/* Song List */}

        </div>        
    )
}

export default SongListScreen;