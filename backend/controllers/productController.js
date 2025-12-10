const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, PNG, WEBP allowed"));
};

const upload = multer({ storage, fileFilter });

// Add product
exports.addProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "Image required" });

      const { name, price, weight, flavours, description, categoryId } = req.body;

      const product = new Product({
        name,
        price,
        weight,
        flavours,
        description,
        image: `/uploads/${req.file.filename}`,
        categoryId,
      });

      await product.save();

      res.status(201).json({
        success: true,
        message: "Product added",
        product,
      });
    } catch (error) {
      console.error("Add product error:", error);
      res.status(500).json({ success: false, message: "Error adding product" });
    }
  },
];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      categoryId: req.params.categoryId,
    }).populate("categoryId", "name");

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("Category products error:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product updated", updated });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Remove image file
    if (product.image) {
      const imgPath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};
