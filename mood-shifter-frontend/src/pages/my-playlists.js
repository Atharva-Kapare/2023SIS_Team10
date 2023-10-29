import React, { useEffect, useState } from 'react';
import PlaylistPageTitle from '../components/playlists/playlist-page-title';
import AddPlaylistButton from '../components/playlists/add-playlist-button';
import Playlist from '../components/playlists/playlist';
import Footer from '../components/footer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import '../App.css';
import '../components/playlists/playlist.css';

function MyPlaylist({ navigation, route }){
    const moodPlaylists = GetMoodPlaylists();
    const moodShiftPlaylists = GetMoodShiftPlaylist();

    let [ formattedPlaylist, setFormattedPlaylist ] = useState([{
        "mood": "Error Loading Playlists!",
        "songs": "song",
        "color": ""
    }]);

    let [ formattedMoodPlaylist, setFormattedMoodShiftPlaylist ] = useState([{
        "name": "Error Loading Playlists!",
        "fromMood": "",
        "toMood": "",
        "duration": ""
    }])

    useEffect(() => {
        if(route.params) {
            console.log("hit: ", route.params)
            const params = route.params
            setFormattedMoodShiftPlaylist([
                ...formattedMoodPlaylist,
                {
                    name: `${params.fromMood} to ${params.toMood} (${params.duration}m)`,
                    fromMood: params.fromMood,
                    toMood: params.toMood,
                    duration: params.duration,
                    color: generate()
                }

            ])
        }
    }, [route.params?.toMood])

    useEffect(() => {
        moodShiftPlaylists.then((res) => {
            let keyStuff = [];

            Object.keys(res).forEach((key) => {
                keyStuff.push({
                    "name": key,
                    "fromMood": res[key].fromMood,
                    "toMood": res[key].toMood,
                    "duration": res[key].duration,
                    "color": generate()
                })
            });
            setFormattedMoodShiftPlaylist(keyStuff)
        });
    }, [])

    useEffect(() => {
        moodPlaylists.then((res) => {
         let keyStuff = [];
            Object.keys(res).forEach((key)=> {
                keyStuff.push(
                    {
                        "mood": key,
                        "songs": res[key],
                        "color": generate()
                    }
                )
            });
            setFormattedPlaylist(keyStuff);            
        })
    }, []);
  
  //current moods
    let moodOutput = [];
        formattedPlaylist.forEach((entry) => {
        moodOutput.push(entry.mood)
    })

    return ( 
        <div className="App-header">
            <div>
                <div>
                    <Box>
                        <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                            <Grid item xs={1.5} sm={5} md={10}>
                                <PlaylistPageTitle/>
                            </Grid>
                            <Grid item xs={.5} sm={1} md={2}>
                                <Button onClick={() => navigation.navigate("NewPlaylistScreen", {moods:moodOutput})}><AddPlaylistButton/></Button>
                            </Grid>
                            {formattedPlaylist.map(playlist => (
                                <Grid item xs={1} sm={2} md={3}>
                                    <button style={{border: "none"}} onClick={() => navigation.navigate('SongListScreen', {
                                        playlistData: playlist,
                                        color: playlist.color
                                    })}>
                                        <Playlist 
                                            key={playlist.mood}
                                            playlist={playlist}
                                        />
                                    </button>
                                    <div className="playlist-name">{playlist.mood}</div>
                                </Grid>
                            ))}

                            {/* <h2 className='header-style'>Mood Shifter Playlists</h2> */}
                            {/* Moodshift Playlist */}
                            {formattedMoodPlaylist.map(playlist => (
                                <Grid item xs={1} sm={2} md={3}>
                                    <button style={{border: "none"}} onClick={() => navigation.navigate('MoodShiftListScreen', {
                                        playlistData: playlist,
                                        color: playlist.color
                                    })}>
                                        <Playlist 
                                            key={playlist.mood}
                                            playlist={playlist}
                                        />
                                    </button>
                                    <div className="playlist-name">{playlist.name}</div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </div>
            <Footer navigation={navigation}></Footer>
        </div> 
    );
}

function generate() {
    var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    
    function populate(a) {
      for ( var i = 0; i < 6; i++ ) {
        var x = Math.round( Math.random() * 14 );
        var y = hexValues[x];
        a += y;
      }
      return a;
    }
    
    var newColor1 = populate('#');
    var newColor2 = populate('#');
    var angle = Math.round( Math.random() * 360 );
    
    var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

    return gradient;
}

async function GetMoodPlaylists() {
    const profile = localStorage.getItem("UID");
    const result = await fetch('http://localhost:8000/taggedSongsGet', 
    {   
      method: 'POST',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
          "UID": profile,
      })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.error(error));
    return result;
}

async function GetMoodShiftPlaylist() {
    const profile = localStorage.getItem("UID");
    const result = await fetch('http://localhost:8000/getConfig', 
    {   
      method: 'POST',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
          "UID": profile,
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API OUT: ", data);
        return data;
    })
    .catch(error => console.error(error));
    return result;
}

export default MyPlaylist;

