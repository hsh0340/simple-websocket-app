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

io.on('connection', () => {
    console.log(socket);
    socket.on('join', () => {});
    socket.on('sendMessage', () => {});
    socket.on('disconnect', () => {});
})

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})