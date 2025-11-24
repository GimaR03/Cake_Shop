import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'shabee-cake-hub-secret';

// Generate JWT Token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Check for admin credentials
    if (username === 'ShabeeCakeHub' && password === 'Shabee20020720') {
      const token = generateToken({
        username: 'ShabeeCakeHub', 
        role: 'admin',
        isAdmin: true
      });
      
      return res.json({
        success: true,
        token,
        user: { 
          username: 'ShabeeCakeHub', 
          role: 'admin' 
        }
      });
    }

    // Check for regular users
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const token = generateToken({
      userId: user._id,
      username: user.username, 
      role: user.role
    });

    res.json({
      success: true,
      token,
      user: { 
        username: user.username, 
        role: user.role 
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// Register controller
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    // Create new user
    const user = new User({ 
      username: username.trim(), 
      password,
      role: 'user'
    });

    await user.save();

    // Generate token for auto-login
    const token = generateToken({
      userId: user._id,
      username: user.username, 
      role: user.role
    });

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      token,
      user: { 
        username: user.username, 
        role: user.role 
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user profile' 
    });
  }
};