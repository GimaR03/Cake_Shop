const Admin = require("../models/adminModel");

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.json({ success: true, message: "Admin created", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
