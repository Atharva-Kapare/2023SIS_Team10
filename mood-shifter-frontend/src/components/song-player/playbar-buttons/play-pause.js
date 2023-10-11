import React, { Component } from "react";
import "../song-player.css";

    const PlayButton = ({isPlaying, onClick}) => {

    return(  <>
        {!isPlaying && (
          <i className="fa fa-play playbar-control-button" onClick={onClick}></i>
          )}
        {isPlaying && <i onClick={onClick} className="fa fa-pause playbar-control-button"></i>}
      </>
  
    );
  };
  
export default PlayButton;
