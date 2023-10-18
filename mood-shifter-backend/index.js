// const express = require('express')
// const app = express
import express from 'express';
const port = 8000
// const auth = require('./auth')
// var querystring = require('querystring')

import { firebase_app } from './firebase_init.js';
import { database } from './firebase_init.js';

import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from 'axios';
// import { getLikedSongs } from './spotify.js';

var client_id = 'bf93ef9d71614b5392aa6528ba81510a';
var redirect_uri = 'http://localhost:3000';

var modelURLBase = 'http://localhost:5000'

const app = express();
app.use(express.json())

app.get('/login', function (req, res) {
  // We get sent the access token and the userID from the frontend
  // The access token is needed to talk to the spotify apis, userID needs to get stored into the backend
  let resp = {};

  console.log(JSON.stringify(req.body));

  // Get all of the liked songs from the user:
  // var likedSongs = await axios.

  // Get the user data if it exists from firebase
  const docRef = doc(database, "users", req.body.UID);
  const docSnapshot = getDoc(docRef);

  if (docSnapshot != null) {
    resp.gettingStarted = false;
  } else {
    resp.gettingStarted = true;
    setDoc(doc(database, 'users', req.body.UID), {
      "moods": {},
      "model": "",
      "configs": {}
    });
    console.log("User with ID: ", req.body.UID, "was made!")
  }
  

  // Talk to the spotify apis to grab the liked songs
  resp.likedSongs = [];
  getLikedSongs(req.body.accessToken)
  .then(spotifyResp => {
    // console.log(spotifyResp.items);
    for(const item in spotifyResp.items) {
      resp.likedSongs.push(spotifyResp.items[item].track.id);
      // resp.likedSongs.push(track.id);
    }
    console.log(resp);
    res.send(resp);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/gettingStarted', (req, res) => {
  res.send('Getting Started Works!')
})


app.get('/test', (req, res) => {
  const resp = setDoc(doc(database, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
})

app.post('/genre', (req, res) => {
  res.send(req.body.song + ' ' + req.body.genre)
})

app.post('/volume', (req, res) => {
  res.send(req.body.song + ' ' + req.body.volume)
})

app.post('/like', (req, res) => {
  res.send(req.body.song)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
