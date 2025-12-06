const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, JPEG images are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Add a new product (handles file upload)
const addProduct = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    try {
      const { name, price, weight, flavours, description, categoryId } = req.body;

      // Validate required fields
      if (!name || !price || !flavours || !description || !categoryId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const product = new Product({
        name,
        price: parseFloat(price),
        weight: weight ? parseFloat(weight) : undefined,
        flavours,
        description,
        image: `/uploads/${req.file.filename}`, // Store relative path
        categoryId
      });

      await product.save();
      res.status(201).json({ success: true, message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
};

// Get products by category (for display)
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId }).populate('categoryId', 'name');
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { addProduct, getProductsByCategory };