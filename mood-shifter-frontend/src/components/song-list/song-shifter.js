import React from 'react';
import RemoveIcon from '../../assets/icons/removeIcon.png';
import TagIcon from '../../assets/icons/tagIcon.png';
import MoreIcon from '../../assets/icons/moreIcon.png';
import './song-list.css'
import { Box, Grid } from '@mui/material';

function SongShifter( { track } ) {

    return (
        <div>
            <Box>
                <Grid container justifyContent={'center'} rowSpacing={{ xs: 3, sm: 2, md: 6 }} columnSpacing={{ xs: 2, sm: 1, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                    {/* cover */}
                    <Grid item xs={.5} sm={1} md={1}>
                        <img className='song-img' alt="" src={track.cover}></img>                        
                    </Grid>

                    {/* track and artist */}
                    <Grid item xs={.7} sm={2.5} md={8}>
                        <h2 className='text-style song-text-title'>{track.name}</h2>
                        <h3 className='text-style song-text-subtitle'>{track.artist}</h3>                     
                    </Grid>

                    {/* tag */}
                    {/* <Grid item xs={.2} sm={.5} md={1}>
                        <button className="icon-button-style"><img alt="tag" className='icon-style' src={TagIcon}></img></button>
                    </Grid> */}

                    {/* remove */}
                    <Grid item xs={.2} sm={.5} md={1}>
                        <button className="icon-button-style"><img alt="remove" className='icon-style' src={RemoveIcon}></img></button>
                    </Grid>

                    {/* more */}
                    <Grid item xs={.2} sm={.5} md={1}>
                        <button className="icon-button-style"><img alt="more" className='icon-style' src={MoreIcon}></img></button>
                    </Grid>
                </Grid>
            </Box>
        </div>
        
    );
}

export default SongShifter;