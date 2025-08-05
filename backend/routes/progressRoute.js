// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const requireAuth = require('../middleware/authmiddleware');

// Submit test result
router.post('/', requireAuth, async (req, res) => {
  const { test, score, total } = req.body;
  const result = await Progress.create({
    user: req.user._id,
    test,
    score,
    total
  });
  res.status(201).json(result);
});

// Get user's progress
router.get('/my-progress', requireAuth, async (req, res) => {
  const progress = await Progress.find({ user: req.user._id }).populate('test');
  res.json(progress);
});

module.exports = router;
