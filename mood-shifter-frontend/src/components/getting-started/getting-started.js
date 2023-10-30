import './getting-started.css';
import React from 'react';
import spotifyLogo from '../../assets/spotify-logo.png';

const tagCount = localStorage.getItem('tagCount');

function GettingStartedScreen( { navigation } ) {
    return (
        <div className="App-header">
            <div className="content-spacer"></div>
            <div className="login-content-div">
                <h1 className="heading">Welcome to Moodshifter!</h1>
                <p className="call-to-action-text">Let's personalise your song choices to give you the best experience.</p>
                <button className="sign-in-button-style" 
                    onClick={() => { 
                        if(tagCount >= 3) {
                            navigation.navigate('PlaylistScreen');
                        } else {
                            navigation.navigate('SelectMoodScreen');
                        }
                    }}
                >Get Started</button>
            </div>
            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo-style"></img>
        </div>
    );
}

export default GettingStartedScreen;