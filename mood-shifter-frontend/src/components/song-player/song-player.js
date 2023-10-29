import React, { useState, useRef, useEffect } from "react";
import PreviousButton from "./playbar-buttons/previous";
import PlayButton from "./playbar-buttons/play-pause";
import NextButton from "./playbar-buttons/next";
import ProgressBar from "./playbar-buttons/progress-bar";
import SongDetails from "./playbar-buttons/song-details";
import "./song-player.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Footer from "../footer"
import authentication from "../../authentication";

function SongPlayerScreen({ navigation, route }) {
  const  playlistData = JSON.parse(localStorage.getItem("MoodPlaylist"));
  let {mood} = route?.params || "NOMOOD";
  let [uris, setUris] = useState([""]);
  let [track, setTrack] = useState(undefined);
  const likedSongs = authentication.getLikedSongs();
  const accessToken = localStorage.getItem("accessToken");
  let [currentIndex, setCurrentIndex] = useState(0);
  let [previousState, setPreviousState] = useState(undefined);
  let [fullyPlayedSongs, setFullyPlayedSongs] = useState([]);

  let [playThisPlease, setPlay] = useState(false);

  let [songs, setSongs] = useState([
    {
      title: "Bloop",
      artists: "Bleep",
      albumCover: "https://via.placeholder.com/60x60",
      uri: "",
    },
  ]);

  useEffect(() => {
    
    console.log('LEEN MOOD', mood);
    if(mood && mood !=="NOMOOD" && Object.keys(playlistData).length > 0){
        if(playlistData?.[mood]?.[0]) {
        console.log("LEEN moodplaylistsongs", playlistData[mood]);
        songs = [];
        const uriList = [];
        
        playlistData[mood].forEach((song, index) => {
          if (index === 0) {
            setTrack({
              name: song.title,
              image: song.cover,
              artists: song.artist,
              id: song.uri,
            });
          }
          
          songs.push({
            title: song.title,
            artist: song.artist,
            albumCover: song.cover,
            uri: song.uri,
          });
        });
        
        songs.map((song) => uriList.push(song.uri));
        setUris(uriList);
        setSongs(songs, ()=> {

          setPlay(true);
          console.log('LEEN PLAYYDKSJHSE/', playThisPlease);
        });
      }
      
      }
    else {
      likedSongs.then((res) => {
        if (res[0]) {
          songs = [];
          const uriList = [];
          res.forEach((song, index) => {
            if (index === 0) {
              setTrack({
                name: song.track.name,
                image: song.track.album.images[0],
                artists: song.track.artists,
                id: song.track.id,
              });
            }
            songs.push({
              title: song.track.name,
              artist: song.track.artists[0].name,
              albumCover: song.track.album.images[0].url,
              uri: song.track.uri,
            });
          });
          songs.map((song) => uriList.push(song.uri));
          setUris(uriList);
          setSongs(songs);
        }
        setPlay(true);
      console.log('LEEN KJFDSHJL/', playThisPlease);

      });
    }
  }, []);

  function onTrackChange(state) {
    console.log("LEEN changed track", state);
    if (
      currentIndex < state.previousTracks.length ||
      previousState.nextTracks.length === 0
    ) {
      const percentagePlayed =
        (previousState.progressMs / previousState.track.durationMs) * 100;
      console.log(
        "LEEN next song, amount played:",
        percentagePlayed,
        fullyPlayedSongs
      );
      if (percentagePlayed >= 80) {
        const playedSongs = fullyPlayedSongs;
        playedSongs.push(previousState.track.id);
        setFullyPlayedSongs(playedSongs);
        if (fullyPlayedSongs.length === 2) {
          const indexOfFullyPlayedSongs = fullyPlayedSongs.length - 1;
          const objectForBackEnd = {
            current: fullyPlayedSongs[indexOfFullyPlayedSongs],
            previous: fullyPlayedSongs[indexOfFullyPlayedSongs - 1],
          };
          console.log("LEEN songs fully played", objectForBackEnd);
          sendSongPlayedObject(objectForBackEnd);
        }
      } else if (fullyPlayedSongs.length > 0) {
        const objectForBackEnd = {
          current: previousState.track.id,
          previous: fullyPlayedSongs[fullyPlayedSongs.length - 1],
        };
        console.log(
          "LEEN song skipped and last song fully played",
          objectForBackEnd
        );
        sendSkippedObject(objectForBackEnd);
      }
    }
  }
  // document.getElementById("Wrapper").style.color = "#2c2c2c";

  async function sendSkippedObject(skippedObject) {
    //TODO add /navigation to url
    await fetch("http://localhost:8000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skippedObject }),
    })
      .then((res) => {
        console.log("skipped object sent", res);
      })
      .catch((error) => console.error(error));
  }

  async function sendSongPlayedObject(songPlayedObject) {
    //TODO add /navigation to url
    await fetch("http://localhost:8000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songPlayedObject }),
    })
      .then((res) => {
        console.log("skipped object sent", res);
      })
      .catch((error) => console.error(error));
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
          if (state.isPlaying === false) {
            setPlay(false);
            console.log('LEEN SET FALSE');
          }
          if (!previousState) {
            setPreviousState(state);
          } else {
            if (state.track.id !== previousState.track.id) {
              const indexOfTrack = state.previousTracks.length;
              setTrack(state.track);
              onTrackChange(state);
              setCurrentIndex(indexOfTrack);
            }
            setPreviousState(state);
          }
        }}
        play={playThisPlease}
      ></SpotifyPlayer>
       {/* <i class="fa-solid fa-bars" onClick={() => navigation.navigate('')}></i> */}
      <Footer navigation={navigation}></Footer>
    </div>
  );
}

export default SongPlayerScreen;
