import React from 'react';
import './getting-started.css';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <h1 className="heading">Select Mood Screen</h1>
            <button className="sign-in-button-style" onClick={() => navigation.navigate('TagSongsScreen')}>Continue</button>
        </div>
    );
}


export default SelectMoodScreen;