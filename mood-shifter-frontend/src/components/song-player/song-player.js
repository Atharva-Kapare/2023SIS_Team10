import React, { useState, useRef, useEffect } from "react";
import PreviousButton from "./playbar-buttons/previous";
import PlayButton from "./playbar-buttons/play-pause";
import NextButton from "./playbar-buttons/next";
import ProgressBar from "./playbar-buttons/progress-bar";
import SongDetails from "./playbar-buttons/song-details";
import "./song-player.css";
import SpotifyPlayer from "react-spotify-web-playback";

function SongPlayerScreen({ navigation }) {

  let [uris, setUris] = useState([""]);
  let [track, setTrack] = useState(undefined);
  let [currentSongId, setCurrentSongId] = useState('');
  const accessToken = localStorage.getItem("accessToken");

  let [songs, setSongs] = useState([
    {
      title: "Bloop",
      artists: "Bleep",
      albumCover: "https://via.placeholder.com/60x60",
      duration: 60,
      uri: "",
    },
  ]);

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
          accessToken: localStorage.getItem("accessToken"),
      }),
    };

    fetch("http://localhost:3001/api/getLikedSongs", options).then((response) => response.json()).then((res) => {
      console.log(
        "Component initialized",
        res.items,
        res.items[0].track.duration_ms / 1000,
        accessToken
      );
      if (res.items[0]) {
        songs = [];
        const uriList = [];
        res.items.forEach((song,index) =>
        {
          if(index === 0){
            setTrack({
              name: song.track.name,
              image: song.track.album.images[0],
              artists: song.track.artists,
            });
          }
          songs.push({
            title: song.track.name,
            artist: song.track.artists[0].name,
            albumCover: song.track.album.images[0].url,
            duration: song.track.duration_ms / 1000,
            uri: song.track.uri,
          })
        }
        );
        songs.map((song) => uriList.push(song.uri));
        setUris(uriList);
        setSongs(songs);
      }
    });
    setCurrentSongId(songs[0].id)
    console.log("LEEN TRACK", track);
   
  }, []);

  function onTrackChange(previousTracks, nextTracks) {
    
  }

  function onPause() {
    //s
  }

  function onPlay() {
//
  }

  function onVolumeChange(volume) {
//
  }

  return (
    <div className="playbar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <SongDetails track={track}></SongDetails>
      <SpotifyPlayer
        token={accessToken}
        uris={uris}
        callback={(state) => {
          console.log('LEEN STATE', state);
          if (state.isPlaying) {
            console.log("LEEN is playing", state.isPlaying);
            onPlay()
          } else {
            console.log("LEEN not playing");
            onPause()
          }
          if (state.track) {
            console.log("LEEN track", state.track, state.previousTracks, state.nextTracks);
            setTrack(state.track);
            onTrackChange(state.previousTracks, state.nextTracks)
          }
          if(state.volume){
            console.log("LEEN Volume change", state.volume);
            onVolumeChange(state.volume);
            // only seems to trigger if song is paused
          }
        }}
      ></SpotifyPlayer>
    </div>
  );
}

export default SongPlayerScreen;
