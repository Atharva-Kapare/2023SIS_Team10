const express = require('express')
const app = express()
const port = 80
const auth = require('./auth')
var querystring = require('querystring')

var client_id = 'bf93ef9d71614b5392aa6528ba81510a';
var redirect_uri = 'http://localhost';

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
