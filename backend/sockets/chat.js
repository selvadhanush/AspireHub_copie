const ForumMessage = require('../models/Message');

module.exports = function chatSocketHandler(io, socket) {
  console.log(`🟢 Chat socket connected: ${socket.id}`);

  // When user sends a message
  socket.on('send_message', async (data) => {
    try {
      const { sender, content, room } = data;

      if (!sender || !content) {
        return console.error("⚠️ Invalid message data:", data);
      }

      const savedMsg = await ForumMessage.create({
        sender,
        content,
        room: room || "general",
      });

      // Broadcast message to all in room
      io.to(savedMsg.room).emit('receive_message', savedMsg);
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  // Joining chat room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`👥 User ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Chat socket disconnected: ${socket.id}`);
  });
};
