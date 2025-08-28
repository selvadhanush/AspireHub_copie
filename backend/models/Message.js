const mongoose = require('mongoose');

const forumMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  room: { type: String, default: "general" },
}, { timestamps: true });

module.exports = mongoose.model('ForumMessage', forumMessageSchema);
