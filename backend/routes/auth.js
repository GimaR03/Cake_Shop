const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { nickname, gender, username, password } = req.body;

    // Validation
    if (!nickname || !gender || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide nickname, gender, username, and password'
      });
    }

    // Validate gender
    if (!['male', 'female'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Gender must be either male or female'
      });
    }

    // Normalize username (lowercase, trim)
    const normalizedUsername = username.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { username: normalizedUsername },
        { username: new RegExp(`^${normalizedUsername}$`, 'i') } // Case-insensitive check
      ]
    });

    if (existingUser) {
      console.log(`Registration failed: Username "${normalizedUsername}" already exists`);
      return res.status(400).json({
        success: false,
        message: `Username "${normalizedUsername}" is already taken. Please choose a different username.`
      });
    }

    // Create new user (email is optional, not included in registration)
    // DO NOT include email field at all - let it be undefined/null
    const userData = {
      nickname: nickname.trim(),
      gender: gender.toLowerCase(),
      username: normalizedUsername,
      password
      // Explicitly NOT including email field
    };

    console.log('Creating user with data:', { ...userData, password: '***' });
    console.log('Email field will not be set (undefined)');

    const user = new User(userData);
    
    // Explicitly ensure email is not set
    if (user.email !== undefined) {
      user.email = undefined;
    }

    try {
      await user.save();
      console.log(`User created successfully: ${user.username}`);
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      throw saveError; // Re-throw to be caught by outer catch block
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        gender: user.gender,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      
      console.error(`Duplicate key error on field: ${field}`, error.keyPattern);
      
      // Only check for username duplicates (email is optional and not used in registration)
      if (field === 'username') {
        return res.status(400).json({
          success: false,
          message: `Username "${normalizedUsername}" is already taken. Please choose a different username.`,
          error: error.message
        });
      } else if (field === 'email') {
        // This shouldn't happen anymore after fixing the index, but handle it gracefully
        console.error('Unexpected email duplicate error - email was not provided in registration!');
        // Since email is not part of registration, this is likely a username conflict
        return res.status(400).json({
          success: false,
          message: `Username "${normalizedUsername}" is already taken. Please choose a different username.`,
          error: 'Username conflict detected'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
          error: error.message
        });
      }
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(', '),
        error: error.message
      });
    }
    
    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      console.log(`Login attempt failed: User not found - ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.log(`Login attempt failed: Invalid password for user - ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log(`Login successful: ${user.username} (${user.role})`);

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        gender: user.gender,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

module.exports = router;

