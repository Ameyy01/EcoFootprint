const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle Google user creation/update
router.post('/google', async (req, res) => {
  try {
    console.log('Received Google user data:', req.body);
    const { userId, email, name } = req.body;

    if (!userId || !email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ userId });

    if (user) {
      // Update existing user
      user.email = email;
      user.name = name;
      await user.save();
      console.log('Updated existing user:', user);
    } else {
      // Create new user
      user = new User({
        userId,
        email,
        name,
        authProvider: 'google'
      });
      await user.save();
      console.log('Created new user:', user);
    }

    res.json({
      success: true,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error in Google user creation/update:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create/update user: ' + error.message
    });
  }
});

module.exports = router; 