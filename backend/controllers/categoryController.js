import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ createdAt: -1 });
    
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
};

// Get single category
export const getCategoryById = async (req, res) => {
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
};