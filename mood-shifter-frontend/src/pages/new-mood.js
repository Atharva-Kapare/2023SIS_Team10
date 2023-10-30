import React, { useEffect, useState } from "react";
import './css/new-mood.css';
import SearchIcon from '../assets/icons/search-icon.png';
import BackIcon from '../assets/icons/backIcon.png';
import authentication from '../authentication';
import Song from "../components/getting-started/song";
import NewPlaylist from "./new-playlist";
import { Box, Grid } from "@mui/material";
import Footer from "../components/footer";


function NewMoodScreen({navigation}) {

    let songsAdded = 0;
    const [ searchResults, setSearchResults ] = useState([]);
    const [ searchTerm, setSearch ] = useState("");
    const [ addedSongs, setAddedSongs ] = useState([]);

    const addSong = (song) => {
        
        let exists = false;
        addedSongs.forEach(item => {
            if(song.uri === item.uri) {
                exists = true;
            }
        })

        if(!exists) {
            setAddedSongs([
                ...addedSongs,
                { 
                    cover: song.cover, 
                    title: song.title, 
                    uri: song.uri, 
                    artist: song.artist 
                }
            ])
            ++songsAdded;
        }    
    }

    function removeSong(song) {

        let tempList = [];
        addedSongs.forEach(item => {
            if(item !== song) {
                tempList.push(item);
            }
        })
        --songsAdded;
        setAddedSongs(tempList);
    }

    useEffect(() => {
        if(!searchTerm) return setSearchResults([]);

        let cancel = false;

        if(cancel) return 
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json;charset=UTF-8",
            },
        };

        fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`, options).then((response) => response.json()).then(res => {
            setSearchResults(res.tracks.items.map(song => {
                const smallestAlbumImage = song.album.images.reduce(
                    (smallest, image) => {
                        if(image.height < smallest.height) return image;
                        return smallest;
                    }, song.album.images[0]
                )
                return {
                    cover: smallestAlbumImage.url,
                    title: song.name,
                    uri: song.uri,
                    artist: song.artists[0].name
                }
            }));
        });

        return () => cancel = true;
    }, [searchTerm])

    return (
        <div className="page-body">
            <Box>
                <Grid container rowSpacing={{ xs: 3, sm: 4, md: 6 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                    {/* Back Button */}
                    <Grid item xs={.5} sm={1} md={2}>
                        <button className="back-icon-style" onClick={() => {
                            navigation.navigate('PlaylistScreen');
                        }}>
                            <img src={BackIcon} alt="back"></img>
                        </button>
                    </Grid>

                    {/* title */}
                    <Grid item xs={1.5} sm={5} md={10}>
                        <h1 className="page-title">Add a new mood</h1>
                    </Grid>

                    {/* mood input */}
                    <Grid item xs={2} sm={5} md={11}>
                        <p className="section-header">Mood Name</p>
                        <input className="mood-input" type="text" placeholder="Type your custom mood..."></input>
                    </Grid>

                    {/* search bar */}
                    <Grid item xs={2} sm={5} md={11}>
                        <p className="section-header">Tag Songs</p>
                        <div className="search-div">
                            <img className="search-style" alt="search icon" src={SearchIcon}></img>
                            <input className="mood-input" placeholder="Enter a song name..." type="text" onChange={e => setSearch(e.target.value)}></input>
                        </div>
                    </Grid>

                    {/* Added songs header */}
                    <Grid item xs={1.6} sm={4} md={10}>
                    <p className="sub-text">Added</p>
                    </Grid>
                    <Grid item xs={.4} sm={2} md={2}>
                    <p className="sub-text">0/3</p>
                    </Grid>

                    {/* Song search list */}
                    <Grid item xs={2} sm={6} md={12}>
                        <p className="sub-text">Suggested</p>
                    </Grid>
                    <Grid item xs={2} sm={5} md={11}>
                        {searchResults.map((song) => (
                            <div  style={{ cursor: "pointer" }} onClick={() => addSong(song)}>
                                <Song 
                                    track={song}
                                    key={song.uri}
                                />
                            </div>
                        ))}
                    </Grid>

                    {/* Create Button */}
                    <Grid item xs={2} sm={5} md={10}>
                        <button className="create-button-style" onClick={createNewMood()}>Create</button>
                    </Grid>
                </Grid>
            </Box>
            <Footer navigation={navigation}></Footer>
        </div>
    );
}

function createNewMood() {

}


export default NewMoodScreen;