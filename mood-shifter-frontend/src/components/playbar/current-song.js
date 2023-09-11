//This component is to show which song is currently playing by spotify. 
import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function CurrentSong({accessToken}) {
    return <SpotifyPlayer />
    token={accessToken}
    uris="spotify:track:2aibwv5hGXSgw7Yru8IYTO?si"
}

