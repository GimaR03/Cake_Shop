const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");

// Helper to ensure DB is connected before attempting queries
function ensureDbConnected(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      success: false,
      message: "Service unavailable: database not connected",
    });
    return false;
  }
  return true;
}

// Add new category
exports.addCategory = async (req, res) => {
  try {
    if (!ensureDbConnected(res)) return;

    const { name, description } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category added",
      category,
    });
  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({ success: false, message: "Error adding category" });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    if (!ensureDbConnected(res)) return;

    const categories = await Category.find().sort({ name: 1 });

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ success: false, message: "Error fetching categories" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    if (!ensureDbConnected(res)) return;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ success: false, message: "Error updating category" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    if (!ensureDbConnected(res)) return;

    const hasProducts = await Product.countDocuments({
      categoryId: req.params.id,
    });

    if (hasProducts)
      return res.status(400).json({
        success: false,
        message: "Cannot delete: category has products",
      });

    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ success: false, message: "Error deleting category" });
  }
};