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

   //connected to moodsOuput on playlist page
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
                    <button id='newStart' className='mood-buttons' onClick={() => {navigation.navigate("NewMoodScreen")}}>+</button>
                    {moods.map((mood) => (
                        <button id={mood} className='mood-buttons' onClick={() => changeSelectedStartMood(mood)}>{mood}</button>
                    ))}
                </div>
            </div>

            {/* end Mood */}
            <div className='new-mood-playlist-div'>
                <h3 className="section-header">Ending Mood</h3>
                <div className='mood-row'>
                    <button id='newEnd' className='mood-buttons' onClick={() => {navigation.navigate("NewMoodScreen")}}>+</button>
                    {moods.map((mood) => (
                        <button id={`End${mood}`} className='mood-buttons' onClick={() =>  changeSelectedEndMood(`End${mood}`, mood)}>{mood} </button>
                    ))}
                </div>
            </div>

             {/* Time */}
             <div className='mood-div'>
                <h3 className="section-header">Time</h3>
                <div className='mood-row'>
                    <button id='30' className='mood-buttons' onClick={() => changeSelectedTime('30')}>30 min</button>
                    <button id='60' className='mood-buttons' onClick={() => changeSelectedTime('60')}>1 hr</button>
                    <button id='90' className='mood-buttons' onClick={() => changeSelectedTime('90')}>1.5 hrs</button>
                    <button id='120' className='mood-buttons' onClick={() => changeSelectedTime('120')}>2 hrs</button>
                </div>
            </div>

            {/* Mood List */}
            <button className="sign-in-button-style" onClick={() => 
                { 
                    if(startMood !== 'none') {
                        if(endMood !== 'none'){
                            if(timeLength !== 'none'){
                                getCurrentMoodList()
                                clearSelected()
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

async function getCurrentMoodList() {
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