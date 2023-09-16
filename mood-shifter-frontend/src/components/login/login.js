import './login.css';
import React from 'react';
import logo from '../../assets/moodshifter-logo.png';
import logoTile from '../../assets/moodshifter-logo-tile.png';
import spotifyLogo from '../../assets/spotify-logo.png';
import Authentication from '../../authentication';

const clientId = "8165af06e3a44a32ac86aa3d998761cd";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

function Login() {
        return (
            <div className="login">
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
                    <button className="sign-in-button-style" onClick={checkAuth}>Sign in with Spotify</button>
                </div>
                
                <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo-style"></img>
            </div>
        );
    
}

function checkAuth() {
    if (!code) {
        localStorage.clear();
        Authentication.redirectToAuthCodeFlow(clientId);
        } else {
        window.onload = async function runAuth() {
            accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                accessToken = await Authentication.getAccessToken(clientId, code);
                localStorage.setItem("accessToken", accessToken);
            }
            const profile = await Authentication.fetchProfile(accessToken);
            const likedSongs = await Authentication.getLikedSongs(accessToken);
            console.log(profile);
            console.log(likedSongs);
            Authentication.populateUI(profile);
        };
    }
}
export default Login;