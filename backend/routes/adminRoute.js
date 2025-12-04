const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const Admin = require("../models/adminModel");

// Create admin route
router.post("/create-admin", AdminController.createAdmin);

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check DB admin
    const admin = await Admin.findOne({ username });

    // If admin exists in DB
    if (admin && admin.password === password) {
      return res.json({
        success: true,
        message: "Admin login successful",
        user: {
          username: admin.username,
          role: "admin"
        }
      });
    }

    // Hard-coded fallback login
    if (username === "ShabeeCakeHub" && password === "Shabee20020720") {
      return res.json({
        success: true,
        message: "Admin login successful",
        user: {
          username: "ShabeeCakeHub",
          role: "admin"
        }
      });
    }

    res.json({ success: false, message: "Invalid username or password" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
