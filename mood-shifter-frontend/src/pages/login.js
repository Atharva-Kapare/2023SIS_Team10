import './css/login.css';
import React, {useState} from 'react';
import logo from '../assets/moodshifter-logo.png';
import logoTile from '../assets/moodshifter-logo-tile.png';
import spotifyLogo from '../assets/spotify-logo.png';
import loadingCircle from '../assets/loading-circle.gif';
import Index from '../index';
import { Button } from 'react-native';

function Login({ navigation }) {
    const [opacityLogin, setOpacityLogin] = useState("100%");
    const [opacityLoading, setOpacityLoading] = useState("0%");
    return (
            <div className="login">
                    <div className="background-tile" style={{opacity: opacityLogin}}>
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
                    <div className="content-spacer" style={{opacity: opacityLogin}}></div>
                    <div className="login-content-div">
                        <img src={logo} alt="Mood Shifter Logo" className="logo-style" style={{opacity: opacityLogin}}></img>
                        <img src={loadingCircle} alt="Loading Circle" style={{opacity: opacityLoading}} className="loading-circle-style"></img>
                        <p className="call-to-action-text" style={{opacity: opacityLogin}}>Listen to your mood</p>
                        <button style={{opacity: opacityLogin}}
                            className="sign-in-button-style" 
                            onClick={() => {
                                setOpacityLogin("30%");
                                setOpacityLoading("100%");
                                Index.AuthCheck({navigation})}}
                        >
                            Sign in with Spotify
                        </button>
                    </div>
                    <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo-style" style={{opacity: opacityLogin}}></img>
                </div>
    );
}

export default Login;