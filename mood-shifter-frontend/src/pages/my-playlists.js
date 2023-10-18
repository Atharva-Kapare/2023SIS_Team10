import React, { useEffect, useState } from 'react';
import PlaylistPageTitle from '../components/playlists/playlist-page-title';
import AddPlaylistButton from '../components/playlists/add-playlist-button';
import Playlist from '../components/playlists/playlist';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import '../App.css';
import '../components/playlists/playlist.css';

function MyPlaylist(){
    
    let i = 0;
    //mood
    const getMoodPlaylists = 
        [
            {
                mood: "Happy",
                color: " ",
                songs: ['0zSDG1EI7SGhM62M5iBiGI', '1FrNSgJjVV0uvg7bMy4HgY', '3OwsQhfC9eJdOlD3IO74l4', 
                '1BdNfvLu7gKdiPThI4Hhwc', '19jTLBrvDBjMqNqb7iZK17', '6m2Ju7nCvHNjQ7dSTEqg8h', 
                '7bo1dKJ6cl3JTYhuavcwWm', '6fNhZRFEkBfgW39W3wKARJ', '42qNWdLKCI41S4uzfamhFM', 
                '6ce17pZwsMcYNab5IaC5MQ', '06cn5ZdNWO2maJ0HrxXqXK', '4ItmLaoV2YCCx0MKKQOTNT', 
                '2XLDi0EEvJKe06OBxfsVEh', '6DaEaZczQdmL0yGydmFWMt', '2psNLeLqcvXL6VIFn146cM', 
                '3nhYDcvWFZk97jm2bCcANA', '2D6IbtbMrzc9LpVWPSWAk1', '2P7nMEix8hB9DpZgWt7A6Y', 
                '1SqMUyn5xMwVRfVzR9DSRs', '4j8HnSXVLfvrbNSQtF14Xf', '0Pex3CycGQdy13cjFF76xA', 
                '1A7qPfbcyRVEdcZiwTFhZI', '33QyoRmhHKADVNXnn4VgvY', '02oAUzv4M0ItuTDy2RT3IT', 
                '3G6hD9B2ZHOsgf4WfNu7X1', '0rRjGruFonCGOt0S5zAJNQ', '3fmQqUTD5QGkkNsXZdCMns', 
                '0EPK3XVvgbe8q0KrS7nEiY', '2WzK3sBkdRm0VvfSKJjXCu', '3ETFRdtKVhljs65WQNyECh', 
                '1ujlPDuUcDs8t3MLBxf21x', '05QTU0jumc79qqlpAzMEbw', '1KYThtnV4Tv3XcoLxywWsP', 
                '5vBTQELDPlPgg6q0mK8cxv', '6CGMZijOAZvTXG21T8t6R0', '3SxiAdI8dP9AaaEz1Z24mn', 
                '2BH3j05ZXWr5PR30sW079d', '5Ro8cPLumZRfhhfVxBG5hJ', '216QQlJgvMuozfjd7OzTXx', 
                '4cx8mRVCvqGM5XiktQedCJ', '5RE3w3M9g5vsotdIVtLONq', '2WObGIQXhjveq6yuXvf6VQ', 
                '7j7zqRfvpOtZHNXgXeMgnr', '3pVVQsP6XAVtFyXvQvYUxd', '09TlxralXOGX35LUutvw7I', 
                '3V9BNT8f4LgPeQqwFfRaTF', '6LZSGrLbddt9KwFbjC8SXz', '3xd4GVGAuzJGdVZLEKvWea', 
                '7C6OeOzOEA0jW8E6uuVgqs', '3hzelPptWzx0OrSDTyIuuy'
                ]
            },
            {
                mood: "Sad",
                color: " ",
                songs: ['0zSDG1EI7SGhM62M5iBiGI', '1FrNSgJjVV0uvg7bMy4HgY', '3OwsQhfC9eJdOlD3IO74l4', 
                '1BdNfvLu7gKdiPThI4Hhwc', '19jTLBrvDBjMqNqb7iZK17', '6m2Ju7nCvHNjQ7dSTEqg8h', 
                '7bo1dKJ6cl3JTYhuavcwWm', '6fNhZRFEkBfgW39W3wKARJ', '42qNWdLKCI41S4uzfamhFM', 
                '6ce17pZwsMcYNab5IaC5MQ', '06cn5ZdNWO2maJ0HrxXqXK', '4ItmLaoV2YCCx0MKKQOTNT', 
                '2XLDi0EEvJKe06OBxfsVEh', '6DaEaZczQdmL0yGydmFWMt', '2psNLeLqcvXL6VIFn146cM', 
                '3nhYDcvWFZk97jm2bCcANA', '2D6IbtbMrzc9LpVWPSWAk1', '2P7nMEix8hB9DpZgWt7A6Y', 
                '1SqMUyn5xMwVRfVzR9DSRs', '4j8HnSXVLfvrbNSQtF14Xf', '0Pex3CycGQdy13cjFF76xA', 
                '1A7qPfbcyRVEdcZiwTFhZI', '33QyoRmhHKADVNXnn4VgvY', '02oAUzv4M0ItuTDy2RT3IT', 
                '3G6hD9B2ZHOsgf4WfNu7X1', '0rRjGruFonCGOt0S5zAJNQ', '3fmQqUTD5QGkkNsXZdCMns', 
                '0EPK3XVvgbe8q0KrS7nEiY', '2WzK3sBkdRm0VvfSKJjXCu', '3ETFRdtKVhljs65WQNyECh', 
                '1ujlPDuUcDs8t3MLBxf21x', '05QTU0jumc79qqlpAzMEbw', '1KYThtnV4Tv3XcoLxywWsP', 
                '5vBTQELDPlPgg6q0mK8cxv', '6CGMZijOAZvTXG21T8t6R0', '3SxiAdI8dP9AaaEz1Z24mn', 
                '2BH3j05ZXWr5PR30sW079d', '5Ro8cPLumZRfhhfVxBG5hJ', '216QQlJgvMuozfjd7OzTXx', 
                '4cx8mRVCvqGM5XiktQedCJ', '5RE3w3M9g5vsotdIVtLONq', '2WObGIQXhjveq6yuXvf6VQ', 
                '7j7zqRfvpOtZHNXgXeMgnr', '3pVVQsP6XAVtFyXvQvYUxd', '09TlxralXOGX35LUutvw7I', 
                '3V9BNT8f4LgPeQqwFfRaTF', '6LZSGrLbddt9KwFbjC8SXz', '3xd4GVGAuzJGdVZLEKvWea', 
                '7C6OeOzOEA0jW8E6uuVgqs', '3hzelPptWzx0OrSDTyIuuy'
                ]
            },
            {
                mood: "Gym",
                color: " ",
                songs: ['0zSDG1EI7SGhM62M5iBiGI', '1FrNSgJjVV0uvg7bMy4HgY', '3OwsQhfC9eJdOlD3IO74l4', 
                '1BdNfvLu7gKdiPThI4Hhwc', '19jTLBrvDBjMqNqb7iZK17', '6m2Ju7nCvHNjQ7dSTEqg8h', 
                '7bo1dKJ6cl3JTYhuavcwWm', '6fNhZRFEkBfgW39W3wKARJ', '42qNWdLKCI41S4uzfamhFM', 
                '6ce17pZwsMcYNab5IaC5MQ', '06cn5ZdNWO2maJ0HrxXqXK', '4ItmLaoV2YCCx0MKKQOTNT', 
                '2XLDi0EEvJKe06OBxfsVEh', '6DaEaZczQdmL0yGydmFWMt', '2psNLeLqcvXL6VIFn146cM', 
                '3nhYDcvWFZk97jm2bCcANA', '2D6IbtbMrzc9LpVWPSWAk1', '2P7nMEix8hB9DpZgWt7A6Y', 
                '1SqMUyn5xMwVRfVzR9DSRs', '4j8HnSXVLfvrbNSQtF14Xf', '0Pex3CycGQdy13cjFF76xA', 
                '1A7qPfbcyRVEdcZiwTFhZI', '33QyoRmhHKADVNXnn4VgvY', '02oAUzv4M0ItuTDy2RT3IT', 
                '3G6hD9B2ZHOsgf4WfNu7X1', '0rRjGruFonCGOt0S5zAJNQ', '3fmQqUTD5QGkkNsXZdCMns', 
                '0EPK3XVvgbe8q0KrS7nEiY', '2WzK3sBkdRm0VvfSKJjXCu', '3ETFRdtKVhljs65WQNyECh', 
                '1ujlPDuUcDs8t3MLBxf21x', '05QTU0jumc79qqlpAzMEbw', '1KYThtnV4Tv3XcoLxywWsP', 
                '5vBTQELDPlPgg6q0mK8cxv', '6CGMZijOAZvTXG21T8t6R0', '3SxiAdI8dP9AaaEz1Z24mn', 
                '2BH3j05ZXWr5PR30sW079d', '5Ro8cPLumZRfhhfVxBG5hJ', '216QQlJgvMuozfjd7OzTXx', 
                '4cx8mRVCvqGM5XiktQedCJ', '5RE3w3M9g5vsotdIVtLONq', '2WObGIQXhjveq6yuXvf6VQ', 
                '7j7zqRfvpOtZHNXgXeMgnr', '3pVVQsP6XAVtFyXvQvYUxd', '09TlxralXOGX35LUutvw7I', 
                '3V9BNT8f4LgPeQqwFfRaTF', '6LZSGrLbddt9KwFbjC8SXz', '3xd4GVGAuzJGdVZLEKvWea', 
                '7C6OeOzOEA0jW8E6uuVgqs', '3hzelPptWzx0OrSDTyIuuy'
                ]
            }
        ];

    getMoodPlaylists.forEach((playlist) => {
        playlist.color = generate();
    });

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
                            
                            {getMoodPlaylists.map(playlist => (
                                <Grid item xs={1} sm={2} md={3}>
                                    <Playlist 
                                        key={playlist.mood}
                                        playlist={playlist}
                                    />
                                    <div className="playlist-name">{playlist.mood}</div>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>       
                </div>
            </div>
        </div> 
    );
}

export default MyPlaylist;


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
