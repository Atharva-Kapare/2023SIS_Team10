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

app.get('/test', (req, res) => {
  const resp = setDoc(doc(database, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
})

app.post('/genre', (req, res) => {
  res.send(req.body.song +  ' ' + req.body.genre)
})

app.post('/volume', (req, res) => {
  res.send(req.body.song +  ' ' + req.body.volume)
})

app.post('/like', (req, res) => {
  res.send(req.body.song)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
