const { Server } = require('socket.io');
const chatHandler = require('./sockets/chat');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // change to frontend URL in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ New WebSocket connection:', socket.id);
    chatHandler(io, socket);
  });
}

module.exports = setupSocket;
