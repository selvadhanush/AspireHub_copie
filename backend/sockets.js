// backend/socket.js
const { Server } = require('socket.io');
const chatHandler = require('./sockets/chat');
const socketHandler = require('./utils/socketHandlers');
module.exports = function (io) {
    socketHandler(io); // this sets up socket event listeners
};

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ New WebSocket connection:', socket.id);
    chatHandler(io, socket);
  });
}

module.exports = setupSocket;
