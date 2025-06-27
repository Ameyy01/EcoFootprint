const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  authProvider: {
    type: String,
    enum: ['google', 'email'],
    required: true
  },
  badges: [{
    type: String,
  }],
  totalEmissionKg: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User; 