import React, { useState } from 'react';
import Footer from '../components/footer';
import '../components/getting-started/getting-started.css';
import '../App.css';
import '../components/playlists/playlist.css';
import Authentication from '../index';

let startMood = 'none';
let endMood = 'none';
let timeLength = 'none';

let selected = {};

function NewPlaylist( { route, navigation } ) {
    const { moods } = route.params;

    return (
        <div className="login">
            <div className="header-div">
                <h1 className="playlist-page-title">New Mood Playlist</h1>
            </div>

            {/* start Mood */}
            <div className='new-mood-playlist-div'>
                <h3 className="section-header">Starting Mood</h3>
                <div className='mood-row'>
                    <button id='newStart' className='mood-buttons' onClick={() => selectNewMood("newStart")}>+</button>
                    {moods.map((mood) => (
                        <button id={mood} className='mood-buttons' onClick={() => changeSelectedStartMood(mood)}>{mood}</button>
                    ))}
                </div>
            </div>

            {/* end Mood */}
            <div className='new-mood-playlist-div'>
                <h3 className="section-header">Ending Mood</h3>
                <div className='mood-row'>
                    <button id='newEnd' className='mood-buttons' onClick={() => selectNewMood("newEnd")}>+</button>
                    {moods.map((mood) => (
                        <button id={`End${mood}`} className='mood-buttons' onClick={() =>  changeSelectedEndMood(`End${mood}`)}>{mood} </button>
                    ))}
                </div>
            </div>

             {/* Time */}
             <div className='mood-div'>
                <h3 className="section-header">Time</h3>
                <div className='mood-row'>
                    <button id='30min' className='mood-buttons' onClick={() => changeSelectedTime('thirtymins')}>30 min</button>
                    <button id='1hr' className='mood-buttons' onClick={() => changeSelectedTime('onehour')}>1 hr</button>
                    <button id='1.5hrs' className='mood-buttons' onClick={() => changeSelectedTime('oneandhalfhours')}>1.5 hrs</button>
                    <button id='2hrs' className='mood-buttons' onClick={() => changeSelectedTime('twohours')}>2 hrs</button>
                </div>
            </div>

            {/* Mood List */}
            <button className="sign-in-button-style" onClick={() => 
                { 
                    if(startMood !== 'none') {
                        if(endMood !== 'none'){
                            if(timeLength !== 'none'){
                                navigation.navigate('PlaylistScreen')
                            } else{ alert("You must select a time.");}
                        } else{ alert("You must select an ending mood.");}    
                    } else{ alert("You must select a starting Mood.");}
                }}
            >Create</button>
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

function changeSelectedEndMood(mood) {
    endMood = mood;
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

function changeSelectedTime(time) {
    timeLength = time;
}

export default NewPlaylist;