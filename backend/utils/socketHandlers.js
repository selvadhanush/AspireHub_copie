const ForumMessage = require('../models/ForumMessage');

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send_message', async (data) => {
      // Save to DB
      const newMessage = new ForumMessage(data);
      await newMessage.save();

      // Broadcast to all clients
      io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = socketHandler;
