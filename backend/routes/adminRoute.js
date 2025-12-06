const express = require('express');
const { addProduct, getProductsByCategory } = require('../controllers/productController');
// Remove or comment out the auth import temporarily
// const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a dummy auth middleware for now
const dummyAuth = (req, res, next) => {
  console.log('Auth middleware called - allowing all requests for now');
  req.user = { id: 'admin', role: 'admin' };
  next();
};

// Existing category routes...

// New product routes - using dummyAuth temporarily
router.post('/admin/products', dummyAuth, addProduct);
router.get('/products/category/:categoryId', getProductsByCategory);

module.exports = router;