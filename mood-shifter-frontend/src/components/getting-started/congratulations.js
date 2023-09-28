import React from 'react';
import './getting-started.css';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <h1 className="heading">Congratulations</h1>
            <button className="sign-in-button-style" onClick={() => navigation.navigate('PlaylistScreen')}>Continue</button>
        </div>
    );
}

export default SelectMoodScreen;