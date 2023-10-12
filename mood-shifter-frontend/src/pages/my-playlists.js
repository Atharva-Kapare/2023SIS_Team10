import React, { useEffect, useState } from 'react';
import PlaylistCover from '../components/playlists/playlist-cover';
import PlaylistName from '../components/playlists/playlist-name';
import PlaylistPageTitle from '../components/playlists/playlist-page-title';
import AddPlaylistButton from '../components/playlists/add-playlist-button';
import Playlist from '../components/playlists/playlist';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import '../App.css';
import '../components/playlists/playlist.css';

let hasRun = false; 

function MyPlaylist(){

    if(!hasRun){
        settingPlaylist();
    }

    //mood
    const [getMoodPlaylists, setMoodPlaylists] = useState([]);

    //moodshift
    const [getMoodshiftPlaylists, setMoodshiftPlaylists] = useState([]);

    function settingPlaylist() {
        hasRun = true;

        let gradient = generate();
    
        console.log(gradient);

        setMoodPlaylists(() => {
            return [
                {
                    color: gradient,
                    name: 'Playlist 1',
                    id: '001'
                },
                {
                    color: gradient,
                    name: 'Playlist 2',
                    id: '002'
                },
                {
                    color: gradient,
                    name: 'Playlist 3',
                    id: '003'
                }
            ]
        })

        console.log(getMoodPlaylists);
    }

/*      const getMoodPlaylists =[{
        color: gradient,
        name: '',
        id:''
    } 

    ]*/

    return ( 
        <div className="App-header">
            <div>
                <div>
                    <Box>
                        <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                            <Grid item xs={1} sm={5} md={10}>
                            <PlaylistPageTitle/>
                            </Grid>
                            <Grid item xs={1} sm={1} md={2}>
                                <Button> <AddPlaylistButton/> </Button>
                            </Grid>
                            <Grid item xs={1} sm={2} md={3}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            
                            {getMoodPlaylists.map(playlistItem => (
                                <Grid item xs={1} sm={2} md={3}>
                                    <Playlist 
                                        color={playlistItem.coverColor}
                                        name={playlistItem.name}
                                    />
                                </Grid>
                            ))}

                        </Grid>
                    </Box>       
                </div>
            </div>
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

export default MyPlaylist;