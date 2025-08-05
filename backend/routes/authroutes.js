const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/authControllers');
const requireAuth = require('../middleware/authmiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Example protected route to test token
router.get('/protected', requireAuth, (req, res) => {
  res.json({
    message: `Hello user with ID: ${req.user.userId}, you're authenticated!`,
  });
});

module.exports = router;
