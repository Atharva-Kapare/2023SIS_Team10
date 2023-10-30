// Display list of songs for a single playlist - interacts with player screen!!!
import React from "react";
import BackIcon from '../assets/icons/backIcon.png'
import './css/song-list.css'
import SearchIcon from "../assets/icons/search-icon.png";
import ExportIcon from '../assets/icons/exportIcon.png';
import PlayIcon from '../assets/icons/playIcon.png';
import Song from "../components/song-list/song";

function SongListScreen({ route, navigation }) {
    const { playlistData, color } = route.params;
    console.log(playlistData)
    const newColor = color.replace(/^(.*#)/, "linear-gradient(0deg, #000000, #");

    const songListBody = (color) => ({ 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        background: `${newColor}`,
        width: "100vw",
        overflowX: "clip",
    })

    return (
        <div className="song-list-body" style={songListBody(color)}>    
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
            <div className="sub-header-style">
                <img className="icon-style-large" alt="Play Song" src={PlayIcon} onClick={ () => {navigation.navigate('SongPlayerScreen', {playlistData: playlistData})}}></img>
                <img className="icon-style-small" style={{cursor: "pointer"}} alt="Export Playlist" src={ExportIcon} onClick={() => { 
                    const options = {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                        body: JSON.stringify({
                            accessToken: localStorage.getItem("accessToken"),
                            name: playlistData.mood + " Playlist",
                            description: "A playlist curated by MoodShifter",
                            trackURIs: playlistData.songs.map(song => (song.uri))
                        }),
                    };
                
                    fetch("http://localhost:8000/api/exportPlaylist", options);
                    alert("Your playlist has been exported to Spotify!");
                }}>
                </img>
            </div>

            {/* Song List */}
            <div className="song-list-display">
                {playlistData.songs.map(song => (
                    <div>
                        <Song
                            key={song}
                            track={song}
                        ></Song>
                    </div>
                ))}
            </div>
            {/* Song List */}

        </div>        
    )
}

export default SongListScreen;