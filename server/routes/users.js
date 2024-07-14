const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure the correct path and case
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 11000) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Error registering user' });
      }
    }
  });

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

module.exports = router;
