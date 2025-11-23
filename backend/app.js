import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection with your credentials
const MONGODB_URI = 'mongodb+srv://shabeecakehub:hzf57AoqEJ80nu9m@cluster0.n4q0qqw.mongodb.net/shabee-cake-hub?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully');
  console.log('📊 Database: shabee-cake-hub');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🗄️ Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB Atlas');
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'user',
    enum: ['user', 'admin']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', userSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  basePrice: { 
    type: Number, 
    required: true,
    min: 0
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model('Category', categorySchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Shabee Cake Hub API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
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
      const token = jwt.sign(
        { 
          username: 'ShabeeCakeHub', 
          role: 'admin',
          isAdmin: true 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        success: true,
        token,
        user: { 
          username: 'ShabeeCakeHub', 
          role: 'admin' 
        }
      });
    }

    // Check for regular users in database
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { 
          username: user.username, 
          role: user.role,
          userId: user._id 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        success: true,
        token,
        user: { 
          username: user.username, 
          role: user.role 
        }
      });
    }

    res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Register endpoint (for regular users)
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
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

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ 
      username: username.trim(), 
      password: hashedPassword,
      role: 'user'
    });

    await user.save();

    // Generate token for auto-login
    const token = jwt.sign(
      { 
        username: user.username, 
        role: user.role,
        userId: user._id 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
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
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      categories 
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories' 
    });
  }
});

// Get single category
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({ 
      success: true, 
      category 
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching category' 
    });
  }
});

// Admin routes - protected
app.post('/api/admin/categories', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    const { name, description, image, basePrice, sizes } = req.body;
    
    // Validation
    if (!name || !description || !image || !basePrice) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const category = new Category({
      name: name.trim(),
      description,
      image,
      basePrice: parseFloat(basePrice),
      sizes: sizes || []
    });

    await category.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Category added successfully',
      category 
    });
  } catch (error) {
    console.error('Add category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding category' 
    });
  }
});

app.put('/api/admin/categories/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    const { name, description, image, basePrice, sizes } = req.body;
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { 
        name: name.trim(), 
        description, 
        image, 
        basePrice: parseFloat(basePrice), 
        sizes: sizes || [],
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Category updated successfully',
      category 
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating category' 
    });
  }
});

app.delete('/api/admin/categories/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting category' 
    });
  }
});

// Get all categories for admin (including inactive)
app.get('/api/admin/categories', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      categories 
    });
  } catch (error) {
    console.error('Get admin categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories' 
    });
  }
});

// Initialize default categories
async function initializeDefaultCategories() {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      const defaultCategories = [
        {
          name: 'Bento Cakes',
          image: './images/bentocake.webp',
          description: 'Adorable single-serving cakes perfect for gifting!',
          basePrice: 25.00,
          sizes: [
            { size: 'Small', price: 25.00 },
            { size: 'Medium', price: 35.00 },
            { size: 'Large', price: 45.00 }
          ]
        },
        {
          name: 'Cakes',
          image: './images/cakes.webp',
          description: 'Timeless favorites for every occasion',
          basePrice: 30.00,
          sizes: [
            { size: '1kg', price: 30.00 },
            { size: '2kg', price: 55.00 },
            { size: '3kg', price: 75.00 }
          ]
        },
        {
          name: 'Celebration Cakes',
          image: './images/CelebrationCake.jpg',
          description: 'Make your special moments sweeter!',
          basePrice: 40.00,
          sizes: [
            { size: '1kg', price: 40.00 },
            { size: '2kg', price: 75.00 },
            { size: '3kg', price: 100.00 }
          ]
        },
        {
          name: 'Desserts',
          image: './images/Desserts.png',
          description: 'Sweet treats to satisfy your cravings',
          basePrice: 15.00,
          sizes: [
            { size: 'Small', price: 15.00 },
            { size: 'Medium', price: 25.00 },
            { size: 'Large', price: 35.00 }
          ]
        },
        {
          name: 'Cup Cakes',
          image: './images/Cupcakes.webp',
          description: 'Bite-sized delights in various flavors',
          basePrice: 8.00,
          sizes: [
            { size: '6 pieces', price: 8.00 },
            { size: '12 pieces', price: 15.00 },
            { size: '24 pieces', price: 28.00 }
          ]
        }
      ];

      await Category.insertMany(defaultCategories);
      console.log('✅ Default categories added to MongoDB Atlas');
    } else {
      console.log('📊 Categories already exist in database');
    }
  } catch (error) {
    console.error('❌ Error initializing categories:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API URL: http://localhost:${PORT}`);
  console.log(`🔗 MongoDB Atlas: Connected`);
  
  // Initialize default data after server starts
  setTimeout(() => {
    initializeDefaultCategories();
  }, 2000);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});