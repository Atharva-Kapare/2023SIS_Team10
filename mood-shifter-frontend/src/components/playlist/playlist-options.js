import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function PlaylistOptions() {
    return (
        //https://mui.com/material-ui/react-grid/
        <div>

            <h3>Playlist Options Component</h3>
            <div>
                    <Box sx={{ flexGrow: 4 }}>
                        <Grid container rowSpacing={3}  columnSpacing={3} columns={8} >
                            <Grid item xs={4}>
                                <Item>Playlist Option 1</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Playlist Option 2</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Playlist Option 3</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Playlist Option 4</Item>
                            </Grid>
                        </Grid>
                    </Box>
            </div>
        </div>
      

    );
}


export default PlaylistOptions;