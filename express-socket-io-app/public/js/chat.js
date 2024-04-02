const socket = io();

const query = new URLSearchParams(location.search);
const username = query.get('username');
const room = query.get('room');
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
const messageTemplate = document.querySelector('#message-template').innerHTML;
const messages = document.querySelector('#messages');

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
    })

    document.querySelector('#sidebar').innerHTML = html;
})

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: message.createdAt,
    })

    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
})

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}