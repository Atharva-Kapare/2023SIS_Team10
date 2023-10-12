//this .js will be the component identifying a playlist cover image
import React from 'react';

import './playlist.css';

function PlaylistCover( {coverColor} ){
    return <div className="playlist-cover" style={{background: {coverColor}}}>

           </div>
}

export default PlaylistCover;