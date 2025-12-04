const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Routes
const adminRoutes = require("./routes/adminRoute");
app.use("/api", adminRoutes);

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://admin:mYwpxR44bbwIdxU3@cluster0.jsq2cda.mongodb.net/mern_auth';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
})
.catch(err => {
    console.log('❌ MongoDB Connection Failed:', err.message);
});

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
