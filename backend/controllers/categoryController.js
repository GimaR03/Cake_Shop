const Category = require('../models/Category');

// Add new category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                success: false, 
                message: 'Category name is required' 
            });
        }

        const category = new Category({
            name,
            description
        });

        await category.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Category added successfully',
            category 
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error adding category' 
        });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        
        res.json({ 
            success: true, 
            count: categories.length,
            categories 
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching categories' 
        });
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const category = await Category.findByIdAndUpdate(
            id, 
            updates, 
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
        console.error('Error updating category:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating category' 
        });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if category has products
        const Product = require('../models/Product');
        const productsCount = await Product.countDocuments({ categoryId: id });
        
        if (productsCount > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete category with existing products' 
            });
        }
        
        const category = await Category.findByIdAndDelete(id);
        
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
        console.error('Error deleting category:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting category' 
        });
    }
};

module.exports = { 
    addCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
};