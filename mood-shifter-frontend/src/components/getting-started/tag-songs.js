import React, { useCallback, useEffect, useRef, useState } from 'react';
import './getting-started.css';
import SearchIcon from '../../assets/icons/search-icon.png'
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'
import Song from './song'
import { Box, Grid } from '@mui/material';

let tagCount = localStorage.getItem('tagCount') || 0;
let songsAdded = 0;

function TagSongsScreen( { route, navigation } ) {
    const playlistData = JSON.parse(localStorage.getItem("playlistData"));
    console.log("Playlist Data: ", playlistData)
    const [ searchResults, setSearchResults ] = useState([]);
    let { selectedMood } = route.params;
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
                    artist: song.artist,
                    id: song.id
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
        const lowerCaseTerm = searchTerm.toLowerCase();
        const resultList = [];
        
        playlistData.likedSongs.map((song) => {
            if(song.name.toLowerCase().includes(lowerCaseTerm) || song.artist.toLowerCase().includes(lowerCaseTerm)) {
                resultList.push(song)
            }
        })
        
        setSearchResults(resultList.map(song => {
            return {
                cover: song.image.url,
                title: song.name,
                uri: song.uri,
                artist: song.artist,
                id: song.id
            }
        }));
    }, [searchTerm])

    return (
        <div className='App-header'>
            <Box>
                <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                    
                    {/* Step and Title and Subtitle */}
                    <Grid item xs={2} sm={6} md={12}>
                        <h4 className="text-style step-text">Step 2</h4>
                    </Grid>
                    <Grid item xs={2} sm={6} md={12}>
                        <h1 className="text-style">Tag 3 Songs</h1>
                    </Grid>
                    <Grid item xs={2} sm={6} md={12}>
                        <h3 className="text-style section-header">Search for 3 or more songs that align with the mood '{selectedMood}'. The more songs you tag the better the results!</h3>
                    </Grid>

                    {/* search bar */}
                    <Grid item xs={2} sm={5} md={11}>
                        <div className="search-div">
                            <img className="search-get-started-style" alt="search icon" src={SearchIcon}></img>
                            <input className="search-bar-style" name="searchbar" id="searchbar" placeholder="Enter a song name..." onKeyUp={(e) => setSearch(e.target.value)}></input>
                        </div>
                    </Grid>
                  
                    {/* Mood playlist title */}

                    {/* Added songs header */}
                    <Grid item xs={1.6} sm={5} md={10}>
                        <p className="subject-text mood-text-style">{selectedMood} Playlist</p>
                    </Grid>
                    <Grid item xs={.4} sm={1} md={2}>
                        <p className="subject-text">{songsAdded}/3</p>
                    </Grid>

                    {/* Adding Song List */}
                    <Grid item xs={2} sm={6} md={12}>
                    {addedSongs.map(song => (
                        <div  style={{ cursor: "pointer"}} onClick={() => removeSong(song)}>
                            <Song 
                                track={song}
                                key={song.uri}
                            />
                        </div>
                    ))}
                    </Grid>

                    <Grid item xs={2} sm={6} md={12}>
                        <h3 className="section-header">Suggested</h3>
                    </Grid>

                    {/* Suggested Song List */}
                    <Grid item xs={2} sm={6} md={12}>
                    <div style={{ overflowY: "scroll", maxHeight: "300px"}}>
                        {searchResults.map(song => (
                            <div  style={{ cursor: "pointer" }} onClick={() => addSong(song)}>
                                <Song 
                                    track={song}
                                    key={song.uri}
                                />
                            </div>
                        )).slice(0,10)}
                        </div>
                    </Grid>

                    <Grid item xs={2} sm={6} md={12}>
                        <button className="sign-in-button-style" 
                            onClick={() => {
                                if(songsAdded < 3) {
                                    alert("Make sure you select at least 3 songs before continuing!");
                                    return false;
                                }  else {
                                    const selectFinish = checkTagged();
                                    
                                    sendUserSongDataToBackend(selectedMood, addedSongs);
                                    setAddedSongs([]);
                                    selectedMood = null;

                                    if(selectFinish) {
                                        navigation.navigate('CongratulationsScreen')
                                    } else {
                                        navigation.navigate('SelectMoodScreen')
                                    }
                                }
                            }}
                        >Continue</button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}

async function sendUserSongDataToBackend(selectedMood, addedSongs) {
    const profile = localStorage.getItem("UID");
    console.log("addedsongs: ",addedSongs)
    await fetch('http://localhost:8000/taggedSongs', 
    {   method: 'POST',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "UID": profile,
            "mood": selectedMood,
            "songs": addedSongs,
        }) 
    })
    .then(response => response.json())
    .then(data => {console.log("respons: ", data)})
    .catch(error => console.error(error));
}

function checkTagged() {
    tagCount += 1;
    localStorage.setItem('tagCount', tagCount);
    if(tagCount >= 3) {
        return true;
    }
    return false;
}

export default TagSongsScreen;