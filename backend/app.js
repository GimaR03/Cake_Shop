const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Add this for serving uploads if needed

const app = express();

// Serve uploaded images statically (add this after middleware)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Existing middleware...
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Existing routes...
const adminRoutes = require("./routes/adminRoute");
app.use("/api", adminRoutes);

// Existing MongoDB and server code...