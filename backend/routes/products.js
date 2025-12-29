const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const router = express.Router();

// Dedicated route to serve product images with better error handling
router.get('/image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Determine upload directory based on environment
    const uploadDir = process.env.VERCEL 
      ? '/tmp/uploads/products' 
      : 'uploads/products';
    
    const imagePath = path.join(uploadDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`);
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Set proper headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send file
    res.sendFile(path.resolve(imagePath));
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving image',
      error: error.message
    });
  }
});

// Configure multer for file uploads
// Handle both local storage (Render) and serverless (Vercel)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // For Vercel/serverless, use /tmp directory (only writable location)
    // For Render/traditional servers, use uploads/products
    const uploadDir = process.env.VERCEL 
      ? '/tmp/uploads/products' 
      : 'uploads/products';
    
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error creating upload directory:', error);
      // Fallback to /tmp if mkdir fails
      const fallbackDir = '/tmp/uploads/products';
      try {
        if (!fs.existsSync(fallbackDir)) {
          fs.mkdirSync(fallbackDir, { recursive: true });
        }
        cb(null, fallbackDir);
      } catch (fallbackError) {
        console.error('Error creating fallback directory:', fallbackError);
        cb(new Error('Cannot create upload directory'));
      }
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Middleware to verify JWT token (for protected routes)
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const User = require('../models/User');
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is admin
    if (user.role !== 'admin' && user.username !== 'ShabeeCakeHub') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Create product (Admin only) - accessible at /api/products
router.post('/', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.'
          });
        }
        return res.status(400).json({
          success: false,
          message: `File upload error: ${err.message}`
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error'
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('Product creation request received');
    console.log('Request body:', req.body);
    console.log('File:', req.file ? req.file.filename : 'No file');

    const { name, price, weight, flavours, description, categoryName, categoryId } = req.body;

    // Validate categoryName and categoryId are provided
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    // All other fields are optional, but at least one should be provided
    if (!name && !price && !flavours && !description && !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one field (name, price, flavours, description, or image)'
      });
    }

    // Ensure categoryName is stored exactly as provided (trimmed)
    const exactCategoryName = categoryName.trim();
    
    console.log(`Saving product with categoryName: "${exactCategoryName}"`);
    
    const productData = {
      categoryName: exactCategoryName,
      categoryId: categoryId || exactCategoryName, // Use categoryName as fallback
    };

    if (name && name.trim()) productData.name = name.trim();
    if (price && price !== '') productData.price = parseFloat(price);
    if (weight && weight !== '') productData.weight = parseFloat(weight);
    if (flavours && flavours.trim()) productData.flavours = flavours.trim();
    if (description && description.trim()) productData.description = description.trim();
    if (req.file) {
      // Store relative path for image
      // For Vercel, files in /tmp won't persist, so this is a temporary solution
      // For Render, this will work correctly
      const imagePath = process.env.VERCEL 
        ? `/uploads/products/${req.file.filename}` // Vercel uses /tmp/uploads/products
        : `/uploads/products/${req.file.filename}`; // Render uses uploads/products
      productData.image = imagePath;
      
      // Warn if using Vercel (files won't persist)
      if (process.env.VERCEL) {
        console.warn('⚠️ WARNING: Vercel serverless - uploaded files in /tmp will be deleted after function execution!');
        console.warn('⚠️ Consider switching to Render for persistent file storage.');
      }
    }

    console.log('Product data to save:', productData);

    const product = new Product(productData);
    await product.save();

    console.log('Product saved successfully:', product._id);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during product creation',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all products for a category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const decodedCategoryName = decodeURIComponent(categoryName);
    
    // Map URL-friendly names to actual category names
    const categoryNameMap = {
      'bento-cakes': 'Bento Cakes',
      'cakes': 'Cakes',
      'celebration-cakes': 'Celebration Cakes',
      'desserts': 'Desserts',
      'cupcakes': 'Cup Cakes',
      'cup-cakes': 'Cup Cakes',
    };
    
    // Use mapped name if available, otherwise use decoded name
    const searchName = categoryNameMap[decodedCategoryName.toLowerCase()] || decodedCategoryName;
    
    console.log(`Fetching products for category: "${searchName}"`);
    
    // Use exact matching (case-insensitive) to avoid partial matches
    // This ensures "Bento Cakes" doesn't match "Cakes"
    // Escape special regex characters in the category name
    const escapedName = searchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const exactMatchRegex = new RegExp(`^${escapedName}$`, 'i');
    
    console.log(`Searching with exact match regex: ${exactMatchRegex}`);
    
    const products = await Product.find({ 
      categoryName: exactMatchRegex
    }).sort({ createdAt: -1 });
    
    // Log found products for debugging
    if (products.length > 0) {
      console.log(`Found ${products.length} products for "${searchName}"`);
      products.forEach((p, idx) => {
        console.log(`  Product ${idx + 1}: categoryName="${p.categoryName}"`);
      });
    } else {
      console.log(`No products found for "${searchName}"`);
      // Check if there are any products with similar names (for debugging)
      const allProducts = await Product.find({}).select('categoryName').limit(10);
      const uniqueCategories = [...new Set(allProducts.map(p => p.categoryName))];
      console.log(`Available category names in database:`, uniqueCategories);
    }

    console.log(`Found ${products.length} products for category: ${searchName}`);

    res.json({
      success: true,
      products,
      count: products.length,
      categoryName: searchName
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching products',
      error: error.message
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching products',
      error: error.message
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching product',
      error: error.message
    });
  }
});

// Update product (Admin only)
router.put('/:id', authenticateToken, (req, res, next) => {
  // Handle multer upload with error handling
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.'
          });
        }
        return res.status(400).json({
          success: false,
          message: `File upload error: ${err.message}`
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error'
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, price, weight, flavours, description } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update fields only if provided (allows clearing fields by sending empty string)
    if (name !== undefined) product.name = name.trim() || undefined;
    if (price !== undefined && price !== '') product.price = parseFloat(price);
    if (weight !== undefined && weight !== '') product.weight = parseFloat(weight);
    if (flavours !== undefined) product.flavours = flavours.trim() || undefined;
    if (description !== undefined) product.description = description.trim() || undefined;
    
    if (req.file) {
      // Delete old image if exists
      if (product.image) {
        const oldImagePath = product.image.startsWith('/') ? product.image.substring(1) : product.image;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      product.image = `/uploads/products/${req.file.filename}`;
    }

    await product.save();

    console.log(`Product updated successfully: ${product._id}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating product',
      error: error.message
    });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete image if exists
    if (product.image) {
      const imagePath = product.image.startsWith('/') ? product.image.substring(1) : product.image;
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (unlinkError) {
          console.error(`Error deleting image file: ${unlinkError.message}`);
          // Continue with product deletion even if image deletion fails
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    console.log(`Product deleted successfully: ${req.params.id}`);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting product',
      error: error.message
    });
  }
});

module.exports = router;

