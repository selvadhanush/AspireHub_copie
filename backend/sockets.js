// sockets/index.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const chatHandler = require('./chat');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // Global auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication required'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.username = decoded.username || 'Anonymous';
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    chatHandler(io, socket);
  });

  return io; // Optional: For future use
}

module.exports = setupSocket;