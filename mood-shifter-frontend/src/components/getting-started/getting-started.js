import './getting-started.css';
import React from 'react';
import spotifyLogo from '../../assets/spotify-logo.png';
import AuthCheck from '../../index';

function GettingStarted() {
    return (
        <div className="login">
            <div className="content-spacer"></div>
            <div className="login-content-div">
                <h1 className="call-to-action-text">Welcome to Moodshifter!</h1>
                <p className="call-to-action-text">Let's personalise your experience to give you the best experience.</p>
                <button className="sign-in-button-style" onClick={GetStarted}>Get Started</button>
            </div>
            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo-style"></img>
        </div>
    );
}

function GetStarted() {
    console.log("Get Started Begun!")
}

export default GettingStarted;