const { addUser, getUsersInRoom, getUser, removeUser } = require("./utils/user");
const { generateMessage } = require("./utils/messages");

const express = require('express');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
// app 객체를 인자로 전달
const server = http.createServer(app);
// server 객체를 인자로 전달
const io = new Server(server);

const path = require('path');

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const PORT = 8000;

io.on('connection', (socket) => {
  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options});

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Admin', `${user.room} 방에 오신 걸 환영합니다.`));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방에 참여했습니다.`));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방을 나갔습니다.`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  });
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
})