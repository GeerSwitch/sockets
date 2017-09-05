const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Events = require('./events');

server.listen(3000);

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client')));

const songNs = io.of('/songs');

app.post('/api/add-song', (req, res) => {
  const { artist, title, duration } = req.body;
  console.log(req.body)
  songNs.emit(Events.SONG_ADDED, { artist, title, duration });

  res.sendStatus(200);
});

app.listen(8888, () => {
  console.log('Listening on port 8888. Socket server listening on :3000');
});
