const express = require('express')
const app = express()
const port = 3000

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