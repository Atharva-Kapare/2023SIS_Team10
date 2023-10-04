import React from 'react';
import PlaylistCover from '../components/playlists/playlist-cover';
import PlaylistName from '../components/playlists/playlist-name';
import PlaylistPageTitle from '../components/playlists/playlist-page-title';
import AddPlaylistButton from '../components/playlists/add-playlist-button';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import '../App.css';
import '../components/playlists/playlist.css';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function MyPlaylist(){
    return ( 
    <div className="App-header">
        <div>
                {/* <div> <PlaylistPageTitle/></div>
                <div> <AddPlaylistButton/></div> */}
                <div>
                    <Box sx={{ flexGrow: 4}}>
                        <Grid container rowSpacing={4}  columnSpacing={1} columns={8} >
                        <Grid item xs={4}>
                                <PlaylistPageTitle/>
                            </Grid>
                            <Grid item xs={4}>
                                <AddPlaylistButton/>
                            </Grid>
                            <Grid item xs={4}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            <Grid item xs={4}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            <Grid item xs={4}>
                                <PlaylistCover/> <PlaylistName/>
                            </Grid>
                            <Grid item xs={4}>
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
