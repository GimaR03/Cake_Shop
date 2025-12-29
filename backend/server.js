const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
// CORS configuration - allow all origins in production, or specific origins
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
// Handle both local storage (Render) and serverless (Vercel)
const serveStaticFiles = () => {
  if (process.env.VERCEL) {
    // For Vercel, try to serve from /tmp (temporary, files will be deleted)
    const tmpPath = '/tmp/uploads';
    app.use('/uploads', express.static(tmpPath, {
      setHeaders: (res, filePath) => {
        // Add CORS headers for images
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        console.log(`Serving static file from Vercel: ${filePath}`);
      },
      fallthrough: false,
      dotfiles: 'ignore'
    }));
    console.log(`✅ Static files configured for Vercel: ${tmpPath}`);
  } else {
    // For Render/traditional servers, use uploads folder
    const uploadsPath = path.join(__dirname, 'uploads');
    app.use('/uploads', express.static(uploadsPath, {
      setHeaders: (res, filePath) => {
        // Add CORS headers for images
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        console.log(`Serving static file: ${filePath}`);
      },
      fallthrough: false,
      dotfiles: 'ignore'
    }));
    console.log(`✅ Static files configured for Render: ${uploadsPath}`);
  }
};

serveStaticFiles();

// Middleware to ensure MongoDB connection before API routes
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Cake Shop Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      register: '/api/register',
      login: '/api/login',
      products: '/api/products'
    }
  });
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    // Ensure DB is connected
    await connectDB();
    res.json({ 
      status: 'OK', 
      message: 'Cake Shop Backend is running',
      timestamp: new Date().toISOString(),
      dbConnected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// MongoDB Connection - Handle for both serverless and traditional servers
let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected) {
    return;
  }

  // If connection exists but not ready, wait for it
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit in serverless - let the function handle the error
    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

// Connect to database (only in non-serverless environments)
// In Vercel, connection will happen on first request
if (!process.env.VERCEL) {
  connectDB();
}

// Export app for Vercel serverless functions
module.exports = app;

// Only listen in development or non-Vercel environments
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api`);
  });
}

