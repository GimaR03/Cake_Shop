const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images (PNG, JPG, JPEG, WEBP) are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Add a new product
const addProduct = async (req, res) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({ 
                    success: false, 
                    message: err.message || 'Error uploading file' 
                });
            }

            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Image file is required' 
                });
            }

            const { name, price, weight, flavours, description, categoryId } = req.body;

            // Validate required fields
            const requiredFields = ['name', 'price', 'flavours', 'description', 'categoryId'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
            
            if (missingFields.length > 0) {
                // Delete uploaded file if validation fails
                if (req.file && fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ 
                    success: false, 
                    message: `Missing required fields: ${missingFields.join(', ')}` 
                });
            }

            // Create product
            const product = new Product({
                name,
                price: parseFloat(price),
                weight: weight ? parseFloat(weight) : undefined,
                flavours,
                description,
                image: `/uploads/${req.file.filename}`,
                categoryId
            });

            await product.save();
            
            res.status(201).json({ 
                success: true, 
                message: 'Product added successfully',
                product: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    categoryId: product.categoryId
                }
            });
        });
    } catch (error) {
        console.error('Error adding product:', error);
        
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 });
        
        res.json({ 
            success: true, 
            count: products.length,
            products 
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching products' 
        });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        if (!categoryId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Category ID is required' 
            });
        }

        const products = await Product.find({ categoryId })
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 });
        
        res.json({ 
            success: true, 
            count: products.length,
            products 
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching products' 
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const product = await Product.findByIdAndUpdate(
            id, 
            updates, 
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Product updated successfully',
            product 
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating product' 
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }
        
        // Delete associated image file
        if (product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        res.json({ 
            success: true, 
            message: 'Product deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting product' 
        });
    }
};

module.exports = { 
    addProduct, 
    getAllProducts, 
    getProductsByCategory, 
    updateProduct, 
    deleteProduct 
};