import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import '../components/getting-started/getting-started.css';
import '../App.css';
import '../components/playlists/playlist.css';
import Authentication from '../index';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

let startMood = 'none';
let endMood = 'none';
let timeLength = 'none';

let selected = {};

function NewPlaylist( { route, navigation } ) {

    // connected to moodsOuput on playlist page
    const [ moods, setMoods ] = useState([]);

    useEffect(() => {
        if(route.params?.moods) {
            const params = route.params;
            let result = [];
            params.moods.forEach((mood) => {
                result.push({
                    "mood": mood.mood,
                    "songs": mood.songs
                })
            })
    
            setMoods([
                ...result
            ])
        }
    }, [route.params?.moods])


    return (
        <div className="App-header">
        <Box>
            <Grid container rowSpacing={{ xs: 4, sm: 4, md: 6 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                <Grid item xs={2} sm={6} md={12}>
                    <h1 className="playlist-page-title">New Mood Playlist</h1>
                </Grid>

                {/* start Mood */}
                <Grid item xs={2} sm={3} md={4}>
                    <Grid>
                        <h3 className="section-header">Starting Mood</h3>
                    </Grid>
                    <Grid>
                        <div className='mood-row'>
                            <button id='newStart' className='mood-buttons' onClick={() => {navigation.navigate("NewMoodScreen");}}>+</button>
                            {moods.map((mood) => (
                                <button id={mood.mood} className='mood-buttons' onClick={() => changeSelectedStartMood(mood.mood)}>{mood.mood}</button>
                            ))}
                        </div>
                    </Grid>
                </Grid>

                {/* end Mood */}
                <Grid item xs={2} sm={3} md={4}>
                    <Grid>
                        <h3 className="section-header">Ending Mood</h3>                
                    </Grid>
                    <Grid>
                        <div className='mood-row'>
                            <button id='newEnd' className='mood-buttons' onClick={() => {navigation.navigate("NewMoodScreen")}}>+</button>
                            {moods.map((mood) => (
                                <button id={`End${mood.mood}`} className='mood-buttons' onClick={() =>  changeSelectedEndMood(`End${mood.mood}`, mood.mood)}>{mood.mood} </button>
                            ))}
                        </div>
                    </Grid>
                </Grid>

                {/* Time */}
                <Grid  item xs={2} sm={3} md={4}>
                    <Grid>
                        <h3 className="section-header">Time</h3>
                    </Grid>
                    <Grid>
                        <div className='mood-row'>
                            <button id='30' className='mood-buttons' onClick={() => changeSelectedTime('30')}>30m </button>
                            <button id='60' className='mood-buttons' onClick={() => changeSelectedTime('60')}>60m</button>
                            <button id='90' className='mood-buttons' onClick={() => changeSelectedTime('90')}>90m</button>
                            <button id='120' className='mood-buttons' onClick={() => changeSelectedTime('120')}>120m</button>
                        </div>
                    </Grid>
                </Grid>         

                {/* Mood List */}
                <Grid item xs={2} sm={6} md={12}>
                    <button className="sign-in-button-style" onClick={() => 
                    { 
                        if(startMood !== 'none') {
                            if(endMood !== 'none'){
                                if(timeLength !== 'none'){
                                    navigation.navigate({
                                        name: "PlaylistScreen",
                                        params: {
                                            fromMood: startMood,
                                            toMood: endMood,
                                            duration: timeLength
                                        },
                                        merge: true
                                    });
                                    SetConfigs();
                                    clearSelected();
                                } else{ alert("You must select a time.");}
                            } else{ alert("You must select an ending mood.");}    
                        } else{ alert("You must select a starting Mood.");}
                    }}
                    >Create</button>
                </Grid>
            </Grid>
        </Box>
        <Footer navigation={navigation}></Footer>
        </div>
    );
}

function selectNewMood(newID) {
    
    selected[newID] = selected[newID] ?? false;
    if (selected[newID] === false){
        document.getElementById(newID).style.border = "solid 2px #60dc70";
        selected[newID] = true;
        console.log('new mood', selected, newID);
    }
    else{
        document.getElementById(newID).style.border = "solid 2px #ffffff"; 
        selected[newID] = false;
        console.log('new mood', selected, newID);
    }
}

function changeSelectedStartMood(mood) {
    startMood = mood;
    selected[mood] = selected[mood] ?? false;
    if (selected[mood] === false){
        document.getElementById(mood).style.border = "solid 2px #60dc70";
        selected[mood] = true;
        console.log('Start mood', selected, mood);
    }
    else{
        document.getElementById(mood).style.border = "solid 2px #ffffff"; 
        selected[mood] = false;
        console.log('Start mood', selected, mood);
    }
}

function changeSelectedEndMood(id, mood) {
    endMood = mood;
    selected[id] = selected[id] ?? false;
    if (selected[id] === false){
        document.getElementById(id).style.border = "solid 2px #60dc70";
        selected[id] = true;
        console.log('Start mood', selected, id);
    }
    else{
        document.getElementById(id).style.border = "solid 2px #ffffff"; 
        selected[id] = false;
        console.log('Start mood', selected, id);
    }
}

function changeSelectedTime(time) {
    timeLength = time;
    selected[time] = selected[time] ?? false;
    if (selected[time] === false){
        document.getElementById(time).style.border = "solid 2px #60dc70";
        selected[time] = true;
        console.log('Start mood', selected, time);
    }
    else{
        document.getElementById(time).style.border = "solid 2px #ffffff"; 
        selected[time] = false;
        console.log('Start mood', selected, time);
    }
}

function clearSelected(){
    Object.keys(selected).forEach((key) => {
        selected[key] = false;
    })

    startMood = 'none';
    endMood = 'none';
    timeLength = 'none';
}

async function SetConfigs() {
    const profile = localStorage.getItem("UID");
    const name = `${startMood} to ${endMood} (${timeLength}m)`

    if(profile != null) {
        await fetch('http://localhost:8000/setConfig', 
        {   method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "UID": profile,
                "name": name,
                "fromMood": startMood,
                "toMood": endMood,
                "duration": timeLength
            })
        })
        .then(response => response.json())
        .then(data => {console.log("Output: ",data)})
        .catch(error => console.error(error));
    } else {
        Authentication.AuthCheck()
    }
}

export default NewPlaylist;