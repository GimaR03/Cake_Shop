require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
}

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add common frontend ports
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir));

// Simple MongoDB connection without deprecated options
const connectDB = async () => {
    try {
        // Try multiple connection options
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/cake-shop';
        console.log(`Attempting to connect to MongoDB at: ${connectionString}`);
        
        await mongoose.connect(connectionString);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️ Starting server without database connection...');
        console.log('💡 To fix: Install MongoDB or use MongoDB Atlas cloud service');
        console.log('📖 Instructions:');
        console.log('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
        console.log('   2. OR Use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas');
    }
};

// Connect to database
connectDB();

// Routes
const adminRoutes = require("./routes/adminRoute");
app.use("/api", adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        message: 'Server is running'
    });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API is working!',
        time: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found',
        path: req.originalUrl 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`📂 Uploads served from: http://localhost:${PORT}/uploads/`);
});