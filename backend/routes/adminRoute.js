const express = require('express');
const { 
    addProduct, 
    getProductsByCategory,
    getAllProducts,
    updateProduct,
    deleteProduct 
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/auth');
const { 
    addCategory, 
    getCategories,
    updateCategory,
    deleteCategory 
} = require('../controllers/categoryController');

const router = express.Router();

// Category Routes
router.post('/admin/categories', authenticateToken, addCategory);
router.get('/categories', getCategories);
router.put('/admin/categories/:id', authenticateToken, updateCategory);
router.delete('/admin/categories/:id', authenticateToken, deleteCategory);

// Product Routes
router.post('/admin/products', authenticateToken, addProduct);
router.get('/products', getAllProducts);
router.get('/products/category/:categoryId', getProductsByCategory);
router.put('/admin/products/:id', authenticateToken, updateProduct);
router.delete('/admin/products/:id', authenticateToken, deleteProduct);

// Admin check route
router.get('/admin/check', authenticateToken, (req, res) => {
    res.json({ 
        success: true, 
        message: 'Admin authenticated',
        user: req.user 
    });
});

module.exports = router;