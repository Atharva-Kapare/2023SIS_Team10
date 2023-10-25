import React, { useState } from 'react';
import '../components/getting-started/getting-started.css';
import '../App.css';
import '../components/playlists/playlist.css';
import Authentication from '../index';

let playlistSelected = 'none';
let moodSelected = 'none';
let timeSelected = 'none';


function NewPlaylist( { route, navigation } ) {
    getCurrentMoodList();

    return (
        <div className="login">
            <div className="header-div">
                <h1 className="playlist-page-title">New Playlist</h1>
            </div>

            {/* Type of Playlist */}
            <div className='new-mood-playlist-div'>
                <h3 className="section-header">Type of Playlist</h3>
                <div className='mood-row'>
                    <button id='mood' className='mood-button-style' onClick={() => changeSelectedPlaylist('Mood')}>Mood</button>
                    <button id='moodshift' className='mood-button-style' onClick={() => changeSelectedPlaylist('Moodshift')}>MoodShift</button>
                </div>
            </div>

            {/* Mood */}
            <div className='new-mood-playlist-div'>
                <h3 className="section-header">Mood</h3>
                <div className='mood-row'>
                    <button id='new' className='mood-button-style'>+</button>
                    {/* {moods.forEach(() => (

                        <button id='1' className='mood-button-style' onClick={
                            () => changeSelectedMood('happy')
                        }>Happy</button>
                    
                    ))} */}
                </div>
            </div>

             {/* Time */}
             <div className='mood-div'>
                <h3 className="section-header">Time</h3>
                <div className='mood-row'>
                    <button id='30min' className='mood-button-style' onClick={() => changeSelectedTime('thirtymins')}>30 min</button>
                    <button id='1hr' className='mood-button-style' onClick={() => changeSelectedTime('onehour')}>1 hr</button>
                    <button id='1.5hrs' className='mood-button-style' onClick={() => changeSelectedTime('oneandhalfhours')}>1.5 hrs</button>
                    <button id='2hrs' className='mood-button-style' onClick={() => changeSelectedTime('twohours')}>2 hrs</button>
                </div>
            </div>

            {/* Mood List */}
            <button className="sign-in-button-style" onClick={() => 
                { 
                    if(playlistSelected !== 'none') {
                        
                        if(moodSelected !== 'none'){
                            
                            if(timeSelected !== 'none'){
                                    navigation.push('PlaylistScreen', 
                                    {
                                        selectedPlaylist: playlistSelected,
                                        selectedMoodStart: moodSelected,
                                        // need to add selectedMoodEnd everywhere
                                        selectedTime: timeSelected,
                                    }
                                );
                            }
                            else{
                                alert("You must select a time.");
                            }
                        }
                        else{
                            alert("You must select a mood.");
                        }    
                    } 
                    else {
                        alert("You must select a playlist.");
                    }
                }}
            >Create</button>
        </div>
    );
}

function changeSelectedPlaylist(type) {
    playlistSelected = type;
}

function changeSelectedMood(mood) {
    moodSelected = mood;
}

function changeSelectedTime(time) {
    timeSelected = time;
}

async function getCurrentMoodList() {
    const profile = localStorage.getItem("UID");
    const name = "Happy to Sad (30m)"

    if(profile != null) {
        await fetch('http://localhost:8000/setConfigs', 
        {   method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "UID": profile,
                "name": name,
                "fromMood": "Sad",
                "toMood": "Happy",
                "duration": "30"
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