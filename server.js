const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

io.on('connection', (socket) => {
  // When a new user connects
  userCount++;
  console.log('A user connected.');

  // Send a welcome message to the newly connected user
  socket.emit('message', 'Welcome to the chat!');

  // Notify all users about the new user connection
  io.emit('message', `A user has connected. Total users: ${userCount}`);

  // When a user disconnects
  socket.on('disconnect', () => {
    userCount--;
    console.log('A user disconnected.');
    io.emit('message', `A user has disconnected. Total users: ${userCount}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// This part is missing from your provided code. It serves the index.html file when someone accesses the root of your server.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
