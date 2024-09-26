import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

let users = [];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('register', (userID) => {
    users.push({ userID, socketID: socket.id });
    io.emit('all_users', users);
  });

  socket.on('send_message', (data) => {
    console.log('message: ', data);
    const receiver = users.find(user => user.userID === data.receiverID);
    if (receiver) {
      io.to(receiver.socketID).emit('receive_message', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    users = users.filter(user => user.socketID !== socket.id);
    io.emit('all_users', users);
  });
});

const PORT = process.env.SERVER_PORT || 7000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
