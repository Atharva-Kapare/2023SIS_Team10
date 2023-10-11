import React from 'react';
import PlaylistCover from '../components/playlists/playlist-cover';
import PlaylistName from '../components/playlists/playlist-name';
import PlaylistPageTitle from '../components/playlists/playlist-page-title';
import AddPlaylistButton from '../components/playlists/add-playlist-button';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import '../App.css';
import '../components/playlists/playlist.css';

function MyPlaylist(){
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
                            <Grid item xs={1} sm={2} md={3}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            <Grid item xs={1} sm={2} md={3}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            <Grid item xs={1} sm={2} md={3}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                        </Grid>
                    </Box>       
                </div>
            </div>
        </div> 
    );
}

export default MyPlaylist;