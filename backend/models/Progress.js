const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true }
}, { timestamps: true }); // 👈 includes createdAt for sorting

module.exports = mongoose.model('Progress', progressSchema);
