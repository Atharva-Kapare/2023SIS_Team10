// const express = require('express')
// const app = express
import express, { response } from 'express';
import cors from 'cors';
const port = 8000
// const auth = require('./auth')
// var querystring = require('querystring')

import { firebase_app } from './firebase_init.js';
import { database } from './firebase_init.js';

import { doc, getDoc, memoryLruGarbageCollector, setDoc, updateDoc } from "firebase/firestore";
import axios from 'axios';
import { getLikedSongs } from './spotify.js';

var client_id = 'bf93ef9d71614b5392aa6528ba81510a';
var redirect_uri = 'http://localhost:3000';

var modelURLBase = 'http://localhost:5000'

const app = express();
app.use(express.json());

// import cors from 'cors';
// app.use(cors());

async function fetchWebApi(token, endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
  headers: {
      Authorization: `Bearer ${token}`,
  },
  method,
  body:JSON.stringify(body)
  });
  return await res.json();
}

app.use(cors());

app.post('/skippedSong', async (req, res) => {
  // Params: UID, current, before
  console.log("SKIPPED SONG: ",req.body);
  res.send(req.body);
})

app.post('/playedSong', async (req, res) => {
  // Params: UID, current, before
  console.log("PLAYED SONG: ",req.body);
  res.send(req.body);
})

app.post('/getConfigPlaylist', async (req, res) => {
  // Params: uid, config
  // config contains: fromMood (string), toMood (string), duration (in minutes)

  // We need to pass this into the model now and it should send back the songs in an array
  // We will then need to take that array and add all of the necessary data for the frontend

  // Params: UID
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  console.log("Tagged songs are getting got.")

  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    // The user exists, we can now take the model and send it to the backend, along with all of the configs passed through

    // console.log("Model sanity check:", docSnapshot.data().model);
    let modelResp = await fetch(modelURLBase + "/mood2mood", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": docSnapshot.data().model,
        "fromMood": req.body.config.fromMood,
        "toMood": req.body.config.toMood,
        "duration": req.body.config.duration
      }),
      method: "POST"
    })
    let response = await modelResp.json();
    // console.log("MODEL RESP, MOOD2MOOD: ", response.queue)
    // console.log("MODEL RESP, model: ", response.model)

    // Set the model and the image to firebase now
    await setDoc(docRef, {
      "model": response.model,
      "graphImage": response.graphImage
    }, { merge: true })
    .then(() => {
      console.log("Firebase now has the latest model as well as the graph image.")
    })
    
    res.send(response.queue)
  }
})

app.post('/login', async function (req, res) {

  // We get sent the access token and the userID from the frontend
  // The access token is needed to talk to the spotify apis, userID needs to get stored into the backend
  let resp = {};

  // Get the user data if it exists from firebase
  const docRef = doc(database, "users", req.body.UID);
  // console.log("TESTTESTTESTTESTTEST")
  // const docSnapshot = await getDoc(docRef);


  const docSnapshot = await getDoc(docRef);
  // Need to check if the doc snapshot exists or not, if not, need to create doc

  // Talk to the spotify apis to grab the liked songs
  // resp.likedSongs = [];
  let likedSongs = await getLikedSongs(req.body.accessToken);

  // likedSongs = likedSongs.splice(0,20);
  // let likedSongs = [];
  // // console.log(spotifyResp);
  // for(const item in spotifyResp.items) {
  //   likedSongs.push(spotifyResp.items[item].track.id);
  //   // console.log(spotifyResp.items[item].track.id);
  //   // resp.likedSongs.push(track.id);
  // }

  resp.likedSongs = likedSongs;

  console.log("Resp: ", resp);

  if (docSnapshot.exists()) {
    var document = docSnapshot.data();
    resp.gettingStarted = document.gettingStarted;

  } else {
    resp.gettingStarted = true;


    // console.log("Document: ", document);


    // Now we need to take the liked songs and send it to the model so it can give us back the model to store in firebase

    // //UNCOMMENT BELOW
    // const modelResp = await fetch(modelURLBase + "/new_user", {
    //   method: "POST",
    //   body: JSON.stringify({ "likedSongs": likedSongs }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

    // console.log("ModelResp: ", modelResp);
    // let response = await modelResp.json();
    // console.log("Res: ", response)

    setDoc(doc(database, 'users', req.body.UID), {
      "moods": {},
      // "model": response,
      "configs": {},
      "gettingStarted": docSnapshot.exists() ? document.gettingStarted : true
    }, { merge: true }).then(console.log("Document for: ", req.body.UID, "was set"));
  }
  res.send(resp);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/taggedSongs', async (req, res) => {
  // Params: UID (string), Mood (string), Songs (array)
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    let mood = req.body.mood
    await setDoc(docRef, {
      "moods": {
        [mood]: req.body.songs
      }
    }, { merge: true })
    .then(res.send({ "Success": "The lists have been stored into firebase" }))
  }
  // SEND DATA TO THE BACKEND HERE:
  // Pass the model, songs (array of objects), mood name (string) back to the model
  // console.log("Model: ", docSnapshot.data().model)

  // let modelResp = await fetch(modelURLBase + "/tagSongs", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     "model": docSnapshot.data().model,
  //     "songs": req.body.songs,
  //     "tag": req.body.mood
  //   }),
  //   method: "POST"
  // })
  // let response = await modelResp.json();
  // console.log("MODEL RESP: ", response)

  // // Now we have to set the model in firebase
  // await setDoc(docRef, {
  //   "model": response
  // }, { merge: true })
  //   .then(() => {
  //     console.log("The model should now be set with the latest tags.")
  //   })

  // const res = await fetch("https://api.spotify.com/v1/me/tracks?", {
  //   headers: {
  //     "Authorization": `Bearer ${token}`,
  //   },
  //   method: "GET"
  // });
  // let response = await res.json();
  // return true;
})

app.post('/setConfig', async (req, res) => {
  // Params: UID (string), Mood (string), Songs (array)
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    let name = req.body.name
    await setDoc(docRef, {
      "configs": {
        [name]: req.body
      }
    }, { merge: true })
      .then(res.send({ "Success": "The configs have been stored into firebase" }))
  }
})

app.post('/getConfig', async (req, res) => {
  // Params: UID
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  console.log("Tagged songs are getting got.")

  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    res.send(docSnapshot.data().configs);
  }
})

app.post('/taggedSongsGet', async (req, res) => {
  // Params: UID
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  console.log("Tagged songs are getting got.")

  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    res.send(docSnapshot.data().moods);
  }
})

app.post('/gettingStarted', async (req, res) => {

  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = await getDoc(docRef);

  console.log(docSnapshot.exists());
  if (!docSnapshot.exists()) {
    res.send("The user does not exist.");
  } else {
    // setDoc(docRef.gettingStarted, false);
    // const resp = await docRef.update({gettingStarted: "false"});
    updateDoc(docRef, { gettingStarted: false })
      .then(() => {
        res.send(`Set the getting started flag to False for user: ${req.body.UID}`);
      });
  }

})

app.get('/test', (req, res) => {
  const resp = setDoc(doc(database, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
})

/* Fields:
    accessToken - String
*/
app.post('/api/getLikedSongs', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/me/tracks?limit=5`, 'GET').then((spotifyRes) => { res.send(spotifyRes); });
})

/* Fields:
    accessToken - String
    trackIDs - String Array (max 5 values)
*/
app.post('/api/getRecommendedSongs', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/recommendations?limit=5&seed_tracks=${req.body.trackIDs.join(',')}`, 'GET').then((spotifyRes) => { res.send(spotifyRes.tracks); });
})

/* Fields:
    accessToken - String
    trackID - String
*/
// app.post('/api/getSong', (req, res) => {
//   fetchWebApi(req.body.accessToken, `v1/tracks/${req.body.trackID}`, 'GET').then((spotifyRes) => {res.send(spotifyRes);});
// })

// app.post('/genre', (req, res) => {
//   res.send(req.body.song + ' ' + req.body.genre)
// })

// app.post('/volume', (req, res) => {
//   res.send(req.body.song + ' ' + req.body.volume)

// })

/* Fields:
    accessToken - String
    searchTerm - String
*/
// app.post('/api/search', (req, res) => {
//   fetchWebApi(req.body.accessToken, `v1/search?q=${req.body.searchTerm}&type=track&limit=10`, 'GET').then((spotifyRes) => {res.send(spotifyRes);});
// })

/* Fields:
    accessToken - String
    name - String
    description - String
    trackURIs - String Array (spotify:track:{ID})
*/
app.post('/api/exportPlaylist', (req, res) => {
  fetchWebApi(req.body.accessToken, 'v1/me', 'GET').then((user) => {
    fetchWebApi(
      req.body.accessToken,
      `v1/users/${user.id}/playlists`, 'POST', {
      "name": req.body.name,
      "description": req.body.description,
      "public": false
    }).then((playlist) => {
      console.log(req.body.trackURIs.join(','))
      fetchWebApi(req.body.accessToken, `v1/playlists/${playlist.id}/tracks?uris=${req.body.trackURIs.join(',')}`, 'POST').then((spotifyRes) => { res.send(spotifyRes); });
    });
  });
})

app.listen(port, () => {
  console.log(`Mood Shifter listening on port ${port}`)
})
