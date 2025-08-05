const express = require('express');
const router = express.Router();
const ForumMessage = require('../models/ForumMessage');

// GET all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ForumMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
