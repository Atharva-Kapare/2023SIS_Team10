import React from 'react';
import './getting-started.css';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <h1 className="heading">Select Mood Screen</h1>
            <button onClick={() => navigation.navigate('TagSongsScreen')}></button>
        </div>
    );
}


export default SelectMoodScreen;