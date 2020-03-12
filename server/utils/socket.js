const socketio = require('socket.io');
// const ChatRoom = require('../classes/chatroom');
// const Lobby = require('../classes/lobby');
const Hearts = require('../classes/hearts');

// var chat = new ChatRoom();
// var lobby = new Lobby();
// var lobbyTimer = null;
// var gameLoopTick = 800;
var heartsGame = new Hearts();

// var gameTimers = {};
// key: id; value: Timer


module.exports = function (server) {
    const io = socketio(server);

    const heartsIO = io.of('/hearts');
    heartsIO.on('connection', (socket) => {
        let id = parseID(socket.id);
        

    });
}

function parseID(socketid) {
    return socketid.substring(socketid.indexOf('#') + 1);
}