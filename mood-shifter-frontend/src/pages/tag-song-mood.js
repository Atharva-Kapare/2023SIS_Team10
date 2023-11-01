import react from 'react';
import '../App.css';
import './css/tag-song.css'
import Song from '../components/song-list/song.js'
import { Box, Grid } from '@mui/material';

function TagSongMoodScreen( {navigation, route} ) {

    const songData = route?.params.song;
    const moodList = route?.params.moodList
    console.log(moodList)

    let formattedList = [];
    moodList.forEach(mood => {
        formattedList.push({"mood":mood.mood})
    })
    console.log("moodList", moodList)

    return (
        <div class="App page-body">
            <div>
                <h1>Tag a song</h1>
                <p>Select a playlist to tag this song to.</p>
            </div>

            {/* Song Display */}
            <div>
                <Box>
                    <Grid container justifyContent={'center'} rowSpacing={{ xs: 3, sm: 2, md: 6 }} columnSpacing={{ xs: 2, sm: 1, md: 12 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                        {/* cover */}
                        <Grid item xs={.5} sm={1} md={3}>
                            <img className='song-img' alt="" src={songData.cover}></img>                        
                        </Grid>

                        {/* track and artist */}
                        <Grid item xs={.7} sm={2.5} md={8}>
                            <h2 className='text-style song-text-title'>{songData.title}</h2>
                            <h3 className='text-style song-text-subtitle'>{songData.artist}</h3>                     
                        </Grid>
                    </Grid>
                </Box>
            </div>

            {/* Playlist List */}
            <div className="mood-list-div">
                {moodList.map(mood => (
                    <button className="mood-button-style" onClick={()=>{
                        AddSongToPlaylist(mood, songData, navigation)
                    }}>
                        <div className="mood-list-item">
                            <h1>{mood.mood}</h1>
                        </div>
                    </button>
                ))}
            </div>

        </div>
    )
}

async function AddSongToPlaylist(mood, songData, navigation) {
    const profile = localStorage.getItem("UID");

    const newSongList = [
        ...mood.songs,
        {
            artist: songData.artist,
            cover: songData.cover,
            id: songData.id,
            title: songData.title,
            uri: songData.uri
        }
    ];

    await fetch('http://localhost:8000/taggedSongs', 
    {   method: 'POST',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "UID": profile,
            "mood": mood.mood,
            "songs": newSongList,
        }) 
    })
    .then(response => response.json())
    .then(data => {console.log("response: ", data)})
    .catch(error => console.error(error));

    navigation.navigate(
    {
        name: "PlaylistScreen",
        params: {
            mood: mood,
            songData: [
                ...mood.songs,
                songData
            ],
            merge: true
        }

    })
}

export default TagSongMoodScreen