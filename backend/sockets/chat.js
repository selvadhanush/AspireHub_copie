// sockets/chat.js
const ForumMessage = require('../models/ForumMessage');
const jwt = require('jsonwebtoken');

module.exports = function chatSocketHandler(io, socket) {
  console.log(`🟢 Chat socket connected: ${socket.id}`);

  // Authenticate user
  const token = socket.handshake.auth.token;
  if (!token) {
    console.error('❌ No token provided for socket:', socket.id);
    socket.emit('error', 'Authentication required');
    return socket.disconnect(true);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id; // Assumes JWT has 'id'
    socket.username = decoded.username || 'Anonymous'; // Fallback if no username
    console.log(`👤 Authenticated: ${socket.username} (ID: ${socket.userId})`);
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    socket.emit('error', 'Invalid token');
    return socket.disconnect(true);
  }

  // Join room
  socket.on('join_room', async (room = 'general') => {
    try {
      socket.join(room);
      console.log(`👥 ${socket.username} joined room: ${room}`);

      // Notify others in room
      socket.to(room).emit('user_joined', {
        message: `${socket.username} joined the room`,
        timestamp: new Date(),
      });

      // Send chat history
      const history = await ForumMessage.find({ room })
        .populate('sender', 'username')
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();
      socket.emit('chat_history', history.reverse());
    } catch (err) {
      console.error(`❌ Error joining room ${room}:`, err.message);
      socket.emit('error', 'Failed to join room');
    }
  });

  // Send message
  socket.on('send_message', async (data) => {
    try {
      const { content, room = 'general' } = data;
      if (!content?.trim()) {
        socket.emit('error', 'Message cannot be empty');
        return;
      }
      if (!socket.rooms.has(room)) {
        socket.emit('error', 'Not in room');
        return;
      }

      const savedMsg = await ForumMessage.create({
        sender: socket.userId,
        content: content.trim(),
        room,
      });

      const populatedMsg = await ForumMessage.findById(savedMsg._id)
        .populate('sender', 'username')
        .lean();

      io.to(room).emit('receive_message', {
        ...populatedMsg,
        sender: populatedMsg.sender?.username || socket.username,
      });
    } catch (err) {
      console.error('❌ Error saving message:', err.message);
      socket.emit('error', 'Failed to send message');
    }
  });

  // Typing indicator
  socket.on('typing', (room = 'general') => {
    socket.to(room).emit('user_typing', `${socket.username} is typing...`);
  });

  socket.on('stop_typing', (room = 'general') => {
    socket.to(room).emit('user_typing', '');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 ${socket.username} disconnected: ${socket.id}`);
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        io.to(room).emit('user_left', {
          message: `${socket.username} left the room`,
          timestamp: new Date(),
        });
      }
    });
  });
};