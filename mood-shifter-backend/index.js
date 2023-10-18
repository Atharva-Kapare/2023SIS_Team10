// const express = require('express')
// const app = express
import express from 'express';
const port = 3001
// const auth = require('./auth')
// var querystring = require('querystring')

import { firebase_app } from './firebase_init.js';
import { database } from './firebase_init.js';

import { doc, setDoc } from "firebase/firestore";

var client_id = 'bf93ef9d71614b5392aa6528ba81510a';
var redirect_uri = 'http://localhost:3000';

const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());

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

app.get('/login', function(req, res) {

  // var state = generateRandomString(16);
  var state = 'bf93ef9d71614b53';
  var scope = 'user-read-private user-read-email';
  

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
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

/* Fields:
    accessToken - String
*/
app.get('/api/getLikedSongs', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/me/tracks?limit=5`, 'GET').then((spotifyRes) => {res.send(spotifyRes.items);});
})

/* Fields:
    accessToken - String
    trackIDs - String Array (max 5 values)
*/
app.get('/api/getRecommendedSongs', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/recommendations?limit=5&seed_tracks=${req.body.trackIDs.join(',')}`, 'GET').then((spotifyRes) => {res.send(spotifyRes.tracks);});
})

/* Fields:
    accessToken - String
    trackID - String
*/
app.get('/api/getSong', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/tracks/${req.body.trackID}`, 'GET').then((spotifyRes) => {res.send(spotifyRes);});
})

/* Fields:
    accessToken - String
    searchTerm - String
*/
app.post('/api/search', (req, res) => {
  fetchWebApi(req.body.accessToken, `v1/search?q=${req.body.searchTerm}&type=track&limit=10`, 'GET').then((spotifyRes) => {res.send(spotifyRes);});
})

app.get('/api/createPlaylist', (req, res) => {
  console.log(req.body.accessToken);
  res.send(req.body.accessToken);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
