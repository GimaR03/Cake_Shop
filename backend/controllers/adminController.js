import Category from '../models/Category.js';

// Add new category
export const addCategory = async (req, res) => {
  try {
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
};

// Update category
export const updateCategory = async (req, res) => {
  try {
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
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
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
};

// Get all categories for admin
export const getAdminCategories = async (req, res) => {
  try {
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
};