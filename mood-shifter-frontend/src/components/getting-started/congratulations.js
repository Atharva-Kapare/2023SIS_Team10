import React from 'react';
import './getting-started.css';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <div className="congrats-div">
                <h1 className="congrats-heading">Congratulations</h1>
                <p className="text-style congrats-text-style">We are collating your song choices and generating a personalised experience to provide you with the best playlist mixes.</p>
                <button className="sign-in-button-style" onClick={() => {
                    navigation.navigate('PlaylistScreen')
                }}
                >Tag More Moods</button>
                <button className="finish-button-style" onClick={() => {
                    SetGettingStartedFlag();
                    navigation.navigate('MyPlaylist')
                }}>Finish</button>
            </div>
        </div>
    );
}

async function SetGettingStartedFlag() {
    const profile = localStorage.GetItem("UID");
    const res = await fetch('http://localhost:8000/gettingsStarted', 
    {   method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "UID": profile,
        })
    })
    
}

export default SelectMoodScreen;