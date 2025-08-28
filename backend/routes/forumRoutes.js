const express = require('express');
const ForumMessage = require('../models/Message'); // <-- make sure file exists
const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await ForumMessage.find().populate("sender", "name email");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new message
router.post('/', async (req, res) => {
  try {
    const newMessage = new ForumMessage(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
