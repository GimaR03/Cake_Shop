const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    trim: true,
    minlength: [2, 'Nickname must be at least 2 characters'],
    maxlength: [50, 'Nickname cannot exceed 50 characters']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true, // Allows multiple null/undefined values - IMPORTANT for unique index
    default: undefined, // Explicitly set to undefined if not provided
    // Remove unique constraint - email should not be unique since it's optional
    // If you need unique emails, only enforce it when email is provided
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    validate: {
      validator: function(v) {
        // Only validate format if email is provided (not null/undefined/empty)
        return !v || v === '' || /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Ensure email is not set if it's empty/undefined (for registration without email)
  if (!this.email || this.email === '') {
    this.email = undefined;
  }
  
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);

