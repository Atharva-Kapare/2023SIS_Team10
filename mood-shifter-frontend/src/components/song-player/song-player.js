import React, { useState, useRef, useEffect } from "react";
import SongDetails from "./playbar-buttons/song-details";
import "./song-player.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Footer from "../footer"
import authentication from "../../authentication";
import { Grid, Box } from "@mui/material";

function SongPlayerScreen({ navigation, route }) {
  // const  playlistData = JSON.parse(localStorage.getItem("MoodPlaylist"));
  let {playlistData} = route?.params ?? {undefined};
  let [uris, setUris] = useState([""]);
  let [track, setTrack] = useState(undefined);
  const likedSongs = JSON.parse(localStorage.getItem("playlistData"));
  const accessToken = localStorage.getItem("accessToken");
  let [currentIndex, setCurrentIndex] = useState(0);
  let [previousState, setPreviousState] = useState(undefined);
  let [fullyPlayedSongs, setFullyPlayedSongs] = useState([]);

  let songIndex = 0;

  
  let playThisPlease = false;
  
  let [songs, setSongs] = useState([
    {
      title: "Bloop",
      artists: "Bleep",
      albumCover: "https://via.placeholder.com/60x60",
      uri: "",
    },
  ]);


  
  useEffect(() => {
    // console.log('LEEN MOOD', playlistData);
    if(playlistData && Object.keys(playlistData)?.length > 0){
      if(playlistData?.["songs"]?.[0]) {
        // console.log("LEEN moodplaylistsongs", playlistData["songs"]);
        songs = [];
        const uriList = [];
        console.log("JACOB PLAYLIST DATA: ", playlistData)
        playlistData["songs"].forEach((song, index) => {
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
          
          playThisPlease = true;
          // console.log('LEEN PLAYYDKSJHSE/', playThisPlease);
        });
      }
      
    }
    else {
      if(likedSongs) {
        // console.log("JACOB PLAYLISTDATA",likedSongs.likedSongs)
          songs = [];
          const uriList = [];
          likedSongs.likedSongs.forEach((song, index) => {
            if (index === 0) {
              setTrack({
                name: song.name,
                image: song.image.url,
                artists: song.artists,
                id: song.id,
              });
            }
            songs.push({
              title: song.name,
              artist: song.artists,
              albumCover: song.image.url,
              uri: song.uri,
            });
          });
          songs.map((song) => uriList.push(song.uri));
          setUris(uriList);
          setSongs(songs);
          // console.log("JR",songs)
        }
        playThisPlease = true;
      // console.log('LEEN KJFDSHJL/', playThisPlease);
    }
  }, []);

async function onTrackChange(state) {
    console.log("LEEN changed track", songIndex, state.previousTracks.length, previousState.nextTracks.length);
    if (
     songIndex>0 && uris[songIndex-1] === state.previousTracks[state.previousTracks.length-1].uri
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
        if (fullyPlayedSongs.length >= 2) {
          const indexOfFullyPlayedSongs = fullyPlayedSongs.length - 1;
          const objectForBackEnd = {
            current: fullyPlayedSongs[indexOfFullyPlayedSongs],
            previous: fullyPlayedSongs[indexOfFullyPlayedSongs - 1],
          };
          console.log("LEEN songs fully played", objectForBackEnd);
          await sendSongPlayedObject(objectForBackEnd);
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
        await sendSkippedObject(objectForBackEnd);
      }
    }
  }
  // document.getElementById("Wrapper").style.color = "#2c2c2c";
  async function sendSkippedObject(skippedObject) {
    //TODO add /navigation to url
    await fetch("http://localhost:8000/skippedSong", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { 
          ...skippedObject,
          "UID": localStorage.getItem("UID") 
        }),
    })
      .then((res) => {
        console.log("skipped object sent", res);
      })
      .catch((error) => console.error(error));
  }

  async function sendSongPlayedObject(songPlayedObject) {
    console.log("Sent")
    //TODO add /navigation to url
    await fetch("http://localhost:8000/playedSong", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { 
          ...songPlayedObject,
          "UID": localStorage.getItem("UID") 
        }),
    })
      .then((res) => {
        console.log("Played object sent", res);
      })
      .catch((error) => console.error(error));
  }

  return (
    <Box className="playbar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Grid  container rowSpacing={{ xs: 3, sm: 4, md: 6 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
        <Grid className="songDetails" item xs={2} sm={6} md={12}>
          <SongDetails track={track}></SongDetails>
        </Grid>
        <Grid item xs={2} sm={6} md={12}>
              <SpotifyPlayer
            token={accessToken}
            uris={uris}
            callback={(state) => {
              const index = uris.indexOf(state.track.uri);
              setCurrentIndex(index);
              songIndex = index;
              console.log("index:",currentIndex, index, songIndex);
              console.log( " ID:",state.track.uri);
              if (state.isPlaying === false) {
                playThisPlease = false;
                // console.log('LEEN SET FALSE');
              }
              if (!previousState) {
                setPreviousState(state);
              } else {
                if(state.track.id !== previousState.track.id){
                  setTrack(state.track);
                  onTrackChange(state);
                }
                setPreviousState(state);

              }
              // console.log("JACOB: ",songIndex)
            }}

            play={playThisPlease}
            styles={{
              activeColor: "#fff",
              bgColor: "#232426",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
          ></SpotifyPlayer>
        </Grid>
      </Grid>
      {/* <i class="fa-solid fa-bars" onClick={() => navigation.navigate('')}></i> */}
      <Footer navigation={navigation}></Footer>
    </Box>
  );
}

export default SongPlayerScreen;
