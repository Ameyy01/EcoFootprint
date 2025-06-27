const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');

// Google Sign-in endpoint
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'ID token is required'
      });
    }

    console.log('Verifying ID token...');
    
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Token verified successfully:', decodedToken);
    
    const { uid, email, name } = decodedToken;

    // Find or create user
    let user = await User.findOne({ userId: uid });
    
    if (!user) {
      console.log('Creating new user with data:', { uid, email, name });
      user = await User.create({
        userId: uid,
        email: email,
        name: name || email.split('@')[0],
        authProvider: 'google',
        badges: []
      });
      console.log('Created new user:', user);
    } else {
      console.log('Found existing user:', user);
    }

    // Return user data
    res.json({
      success: true,
      userId: user.userId,
      userName: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Google auth error:', error);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      error: error.message || 'Authentication failed'
    });
  }
});

module.exports = router;