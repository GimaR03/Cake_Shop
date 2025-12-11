require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Normalize environment
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin:
      NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cake-shop";
let dbConnected = false;

async function connectWithRetry(retries = 5, delay = 3000) {
  let attempt = 0;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  while (attempt < retries) {
    try {
      attempt++;
      console.log(`Attempting MongoDB connection (attempt ${attempt}/${retries}) to ${MONGO_URI}`);
      await mongoose.connect(MONGO_URI, opts);
      console.log("MongoDB connected successfully");
      dbConnected = true;
      return;
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}):`, err.message);
      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  console.error(`Failed to connect to MongoDB after ${retries} attempts. The app will continue running but database functionality will be unavailable until a connection is established.`);
}

// Start connection attempts but do not block server start indefinitely
connectWithRetry().catch((err) => console.error("Unexpected error while connecting to MongoDB:", err));

// Routes
const adminRoutes = require("./routes/adminRoute");
app.use("/api", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${NODE_ENV}`));

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

module.exports = app;
