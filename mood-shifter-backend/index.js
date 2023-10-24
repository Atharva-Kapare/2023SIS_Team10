// const express = require('express')
// const app = express
import express from 'express';
import cors from 'cors';
const port = 8000
// const auth = require('./auth')
// var querystring = require('querystring')

import { firebase_app } from './firebase_init.js';
import { database } from './firebase_init.js';

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import axios from 'axios';
import { getLikedSongs } from './spotify.js';

var client_id = 'bf93ef9d71614b5392aa6528ba81510a';
var redirect_uri = 'http://localhost:3000';

var modelURLBase = 'http://localhost:5000'

const app = express();
app.use(express.json());
app.use(cors());

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

  if (docSnapshot.exists()){
    var document = docSnapshot.data();
    resp.gettingStarted = document.gettingStarted;
  } else {
    resp.gettingStarted = true;
  }

  // console.log("Document: ", document);
  
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
  res.send(resp);

  // Now we need to take the liked songs and send it to the model so it can give us back the model to store in firebase

  // //UNCOMMENT BELOW
  // const modelResp = await fetch(modelURLBase + "/new_user", {
  //   method: "POST", 
  //   body: JSON.stringify({"likedSongs": likedSongs}),
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
  }).then(console.log("Document for: ", req.body.UID, "was set"));

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/taggedSongs', async (req,res) => {
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
    }, {merge:true})
    .then(res.send("Hopefully updated"))
  }

  // SEND DATA TO THE BACKEND HERE:
  


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
    updateDoc(docRef, {gettingStarted: false})
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
