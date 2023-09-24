import React from 'react';
import './getting-started.css';

function TagSongsScreen( { navigation } ) {
    return (
        <div className="login">
            <h1 className="heading">Tag Songs Screen</h1>
            <button onClick={() => navigation.navigate('CongratulationsScreen')}></button>
        </div>
    );
}


export default TagSongsScreen;