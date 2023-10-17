import React from "react";
import './css/settings.css'

function SettingsScreen() {
    let username = '';
    
    return (
        <div class="settings-div">
            <h1>Settings</h1>
            <h2>Logged in: {username}</h2>
            <div class="updated-div">
                <h2>Recieve email updates: </h2>
                <label class="switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
    )
}

export default SettingsScreen;