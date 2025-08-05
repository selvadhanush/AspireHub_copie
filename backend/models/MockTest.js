const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctOption: Number
});

const mockTestSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('MockTest', mockTestSchema);
