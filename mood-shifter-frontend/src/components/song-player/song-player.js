import React, { useState, useRef, useEffect } from "react";
import PreviousButton from "./playbar-buttons/previous";
import PlayButton from "./playbar-buttons/play-pause";
import NextButton from "./playbar-buttons/next";
import ProgressBar from "./playbar-buttons/progress-bar";
import SongDetails from "./playbar-buttons/song-details";
import "./song-player.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Footer from "../footer"

function SongPlayerScreen({ navigation }) {

  return (
    <div></div>
  )

//   let [uris, setUris] = useState([""]);
//   let [track, setTrack] = useState(undefined);
  
  
// // <<<<<<< backend-api
//   let [currentSongId, setCurrentSongId] = useState('');
// // =======
//   const likedSongs = Authentication.getLikedSongs();
// // >>>>>>> development
  
//   const accessToken = localStorage.getItem("accessToken");
//   let [currentIndex, setCurrentIndex] = useState(0);
//   let [previousState, setPreviousState] = useState(undefined)
//   let [fullyPlayedSongs, setFullyPlayedSongs] = useState([]);
//   let [songs, setSongs] = useState([
//     {
//       title: "Bloop",
//       artists: "Bleep",
//       albumCover: "https://via.placeholder.com/60x60",
//       duration: 60,
//       uri: "",
//     },
//   ]);

//   useEffect(() => {
    
    
    
// // <<<<<<< backend-api
//     const options = {
//       method: "POST",
//       headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json;charset=UTF-8",
//       },
//       body: JSON.stringify({
//           accessToken: localStorage.getItem("accessToken"),
//       }),
//     };

//     fetch("http://localhost:3001/api/getLikedSongs", options)
//     .then((response) => response.json())
//     .then((res) => {
//       console.log(
//         "Component initialized",
//         res.items,
//         res.items[0].track.duration_ms / 1000,
//         accessToken
//       );
//       if (res.items[0]) {
//   // =======
//           likedSongs.then((res) => {
//         // console.log(
//         //   "Component initialized",
//         //   res,
//         //   res[0].track.duration_ms / 1000,
//         //   accessToken
//         // );
//           if (res[0]) {
//   // >>>>>>> development
          
          
          
//             songs = [];
//             const uriList = [];
//             res.items.forEach((song,index) =>
//             {
//               if(index === 0){
//                 setTrack({
//                   name: song.track.name,
//                   image: song.track.album.images[0],
//                   artists: song.track.artists,
//                   id: song.track.id
//                 });
//               }
//               songs.push({
//                 title: song.track.name,
//                 artist: song.track.artists[0].name,
//                 albumCover: song.track.album.images[0].url,
//                 duration: song.track.duration_ms / 1000,
//                 uri: song.track.uri,
//               });
//             });

//             songs.map((song) => uriList.push(song.uri));
//             setUris(uriList);
//             setSongs(songs);
//           }
//       });
//     }
//   }, []);

//   function onTrackChange(state) {
//     console.log('LEEN changed track', state);
//     if(currentIndex<state.previousTracks.length || previousState.nextTracks.length === 0){
//       const percentagePlayed =  (previousState.progressMs/previousState.track.durationMs)*100;
//       console.log('LEEN next song, amount played:', percentagePlayed, fullyPlayedSongs);
//       if(percentagePlayed >= 80){
//         const playedSongs = fullyPlayedSongs;
//         playedSongs.push(previousState.track.id);
//         setFullyPlayedSongs(playedSongs);
//         if(fullyPlayedSongs.length === 2){
//           const indexOfFullyPlayedSongs = fullyPlayedSongs.length -1;
//           const objectForBackEnd = {
//             current: fullyPlayedSongs[indexOfFullyPlayedSongs],
//             previous: fullyPlayedSongs[indexOfFullyPlayedSongs-1]

//           }
//           console.log('LEEN songs fully played', objectForBackEnd);
//         }
//       }
//       else if(fullyPlayedSongs.length > 0){
//         const objectForBackEnd = {
//           current: previousState.track.id,
//           previous: fullyPlayedSongs[fullyPlayedSongs.length-1]
//         }
//         console.log('LEEN song skipped and last song fully played', objectForBackEnd);
//       }
//     }
//   }
//   // document.getElementById("Wrapper").style.color = "#2c2c2c";

//   return (
//     <div className="playbar">
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
//       ></link>
//       <SongDetails track={track}></SongDetails>
//       <SpotifyPlayer
//         token={accessToken}
//         uris={uris}
//         callback={(state) => {
//             if(!previousState){
//               setPreviousState(state);
//           }
//           else{
//           if (state.track.id !== previousState.track.id) {
//             const indexOfTrack = state.previousTracks.length;            
//             setTrack(state.track);
//             onTrackChange(state);
//             setCurrentIndex(indexOfTrack);
//           }
//           setPreviousState(state);
//         }
//         }}
//       ></SpotifyPlayer>
//        <i class="fa-solid fa-bars" onClick={navigation.navigate('')}></i>
//       <Footer navigation={navigation}></Footer>
//     </div>
//   );
}

export default SongPlayerScreen;
