// create new http server
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' }
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        io.emit('message', `${socket.id}: ${message}`);
    })
})

const PORT = 8000;
http.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})