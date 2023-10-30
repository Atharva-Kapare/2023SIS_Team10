import './css/login.css';
import React from 'react';
import logo from '../assets/moodshifter-logo.png';
import logoTile from '../assets/moodshifter-logo-tile.png';
import spotifyLogo from '../assets/spotify-logo.png';
import Index from '../index';
import { Button } from 'react-native';

function Login({ navigation }) {
    return (
        <div className="App-header">
            <div className="background-tile">
                <div className="background-tile-row">
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                </div>
                <div className="background-tile-row">
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                </div>
                <div className="background-tile-row">
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                </div>
                <div className="background-tile-row-last">
                    <img src={logoTile} alt=""></img>
                    <img src={logoTile} alt=""></img>
                </div>
            </div>
            <div className="content-spacer"></div>
            <div className="login-content-div">
                <img src={logo} alt="Mood Shifter Logo" className="logo-style"></img>
                <p className="call-to-action-text">Listen to your mood</p>
                <button 
                    className="sign-in-button-style" 
                    onClick={() => {Index.AuthCheck({navigation})}}
                >
                    Sign in with Spotify
                </button>
            </div>
            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo-style"></img>
        </div>
    );
}

export default Login;