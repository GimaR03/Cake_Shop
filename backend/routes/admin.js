import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  getAdminCategories 
} from '../controllers/adminController.js';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken, requireAdmin);

// Admin category routes
router.get('/categories', getAdminCategories);
router.post('/categories', addCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;