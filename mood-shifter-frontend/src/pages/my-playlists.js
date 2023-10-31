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
        moodOutput.push(
            {
                "mood": entry.mood,
                "songs": []
            }
        )
    })
    console.log(moodOutput)

    return ( 
        <div className="App-header">
            <Box>
                <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                    {/* title and add playlist btn */}
                    <Grid item xs={1.5} sm={5} md={10}>
                        <PlaylistPageTitle/>
                    </Grid>
                    <Grid item xs={.5} sm={1} md={2}>
                        <Button onClick={() => navigation.navigate(
                            {
                                name:"NewPlaylistScreen", 
                                params: {
                                    moods:moodOutput
                                },
                                merge: true
                            })}
                        ><AddPlaylistButton/></Button>
                    </Grid>

                    {/* Mood Playlists */}
                    {formattedPlaylist.map(playlist => (
                        <Grid item xs={1} sm={2} md={3}>
                            <button className='playlist-cover-btn' style={{border: "none"}} onClick={() => navigation.navigate('SongListScreen', {
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
                    {/* Mood Shift Playlists */}
                    {formattedMoodPlaylist.map(playlist => (
                        <Grid item xs={1} sm={2} md={3}>
                            <button className='playlist-cover-btn' style={{border: "none"}} onClick={() => GetConfigPlaylist(playlist, navigation)}>
                                <Playlist 
                                    key={playlist.name}
                                    playlist={playlist}
                                />
                            </button>
                            <div className="playlist-name">{playlist.name}</div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer navigation={navigation}></Footer>
        </div> 
    );
}

// generates background color
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

async function GetConfigPlaylist(config, navigation) {
    console.log("config: ", config)
    const profile = localStorage.getItem("UID");
    const result = await fetch('http://localhost:8000/getConfigPlaylist', 
    {   
      method: 'POST',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "UID": profile,
        "config": config
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log("CONFIG OUT: ", data);
        navigation.navigate('MoodShiftListScreen', {
            playlistData: data,
            color: generate(),
            name: config.name
        })
    })
    .catch(error => console.error(error));
    return result;

}

export default MyPlaylist;

