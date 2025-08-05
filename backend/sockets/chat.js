const ForumMessage = require('../models/ForumMessage');

module.exports = function chatSocketHandler(io, socket) {
  console.log(`🟢 Chat socket connected: ${socket.id}`);

  socket.on('send_message', async (data) => {
    try {
      const savedMsg = await ForumMessage.create(data);
      io.emit('receive_message', savedMsg); // Send to all clients
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Chat socket disconnected: ${socket.id}`);
  });
};
