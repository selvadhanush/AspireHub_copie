const mongoose = require('mongoose');

const forumMessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String }, // Could also use Date
}, { timestamps: true });

module.exports = mongoose.model('ForumMessage', forumMessageSchema);
