// Display list of songs for a single playlist - interacts with player screen!!!
import React from "react";
import BackIcon from '../assets/icons/backIcon.png';
import './css/song-list.css';
import SearchIcon from "../assets/icons/search-icon.png";
import ExportIcon from '../assets/icons/exportIcon.png';
import PlayIcon from '../assets/icons/playIcon.png';
import Song from "../components/song-list/song";
import "../components/song-list/song-list.css";
import { Box, Grid } from "@mui/material";

function SongListScreen({ route, navigation }) {
    const { playlistData, color } = route.params;
    console.log(playlistData)
    const newColor = color.replace(/^(.*#)/, "linear-gradient(0deg, #000000, #");

    const songListBody = (color) => ({ 
        background: `${newColor}`,
    })

    return (
        <div className="song-list-body" style={songListBody(color)}> 
            <Box>
                <Grid container rowSpacing={{ xs: 3, sm: 4, md: 6 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                    {/* back button */}
                    <Grid item xs={1.8} sm={5} md={11}>
                        <div className="back-icon-div song-list-space">
                            <button className="back-icon-style" onClick={() => {navigation.navigate('PlaylistScreen', {playlistData: playlistData})}}>
                                <img src={BackIcon} alt="back"></img>
                            </button>
                        </div>
                    </Grid>
                    {/* title */}
                    <Grid item xs={1.5} sm={5} md={11}>
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
                    </Grid>

                    {/* search */}
                    <Grid item xs={.5} sm={1} md={1}>
                        <img alt="Search Song" src={SearchIcon}></img>
                    </Grid>

                    {/* spacer, export and play */}
                    <Grid item xs={1.} sm={4} md={9}></Grid> 
                    <Grid item xs={.3} sm={.5} md={1}> 
                        <img className="icon-style-small" alt="Export Playlist" src={ExportIcon}></img>
                    </Grid>
                    <Grid item xs={.5} sm={.5} md={1}>
                        <img className="icon-style-large" alt="Play Song" src={PlayIcon}></img>
                    </Grid>
                    
                    {/* Song List */}
                    <Grid item xs={2} sm={6} md={11}>
                        {playlistData.songs.map(song => (
                            <div>
                                <Song
                                    key={song}
                                    track={song}
                                ></Song>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Box>  
        </div>
    )
}

export default SongListScreen;