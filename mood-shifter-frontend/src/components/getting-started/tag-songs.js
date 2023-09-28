import React from 'react';
import './getting-started.css';

function TagSongsScreen( { navigation } ) {
    return (
        <div className="login">
            <h1 className="heading">Tag Songs Screen</h1>
            <button className="sign-in-button-style" onClick={() => navigation.navigate('CongratulationsScreen')}>Continue</button>
        </div>
    );
}


export default TagSongsScreen;