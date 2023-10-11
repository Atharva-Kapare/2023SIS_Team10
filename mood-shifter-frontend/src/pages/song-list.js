import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import '../App.css';
import '../components/playlists/playlist.css';
import SongItem from '../components/playlist/song-item';

function SongList(){
    return ( 
        <div className="App-header">
            <div>
                <div>
                    <Box>
                        <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                            <Grid item xs={1} sm={5} md={10}>
                                <SongItem/>
                            </Grid>
                            
                        </Grid>
                    </Box>       
                </div>
            </div>
        </div> 
    );
}

export default SongList;