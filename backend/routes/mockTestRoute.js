// routes/mockTestRoutes.js
const express = require('express');
const router = express.Router();
const MockTest = require('../models/MockTest');
const requireAuth = require('../middleware/authmiddleware');

// Create a mock test
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newTest = await MockTest.create({
      title,
      questions,
      createdBy: req.user._id
    });
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all mock tests
router.get('/', async (req, res) => {
  const tests = await MockTest.find();
  res.json(tests);
});

module.exports = router;

