require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cake-shop";
<<<<<<< Updated upstream

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));
=======

// Optional: avoid extremely long internal buffering window if desired
// mongoose.set('bufferCommands', false);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection state: connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection state: disconnected");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error event:", err && err.message ? err.message : err);
});

async function connectWithRetry(retries = 5, delay = 3000) {
  let attempt = 0;
  const opts = {
    // Make connection attempts fail faster so our retry loop can act
    serverSelectionTimeoutMS: 5000,
  };

  while (attempt < retries) {
    try {
      attempt++;
      console.log(`Attempting MongoDB connection (attempt ${attempt}/${retries}) to ${MONGO_URI}`);
      await mongoose.connect(MONGO_URI, opts);
      console.log("MongoDB connected successfully");
      return;
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}):`, err && err.message ? err.message : err);
      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  console.error(
    `Failed to connect to MongoDB after ${retries} attempts. The app will continue running but database functionality will be unavailable until a connection is established.`
  );
}

// Start connection attempts (non-blocking for server start)
connectWithRetry().catch((err) => console.error("Unexpected error while connecting to MongoDB:", err));
>>>>>>> Stashed changes

// Routes
const adminRoutes = require("./routes/adminRoute");
app.use("/api", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const stateText = state === 1 ? "Connected" : state === 2 ? "Connecting" : "Disconnected";
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
<<<<<<< Updated upstream
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
=======
    database: stateText,
>>>>>>> Stashed changes
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Server error",
<<<<<<< Updated upstream
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
=======
    error: NODE_ENV === "development" ? (err && err.message ? err.message : err) : undefined,
>>>>>>> Stashed changes
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

<<<<<<< Updated upstream
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`)
);
=======
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${NODE_ENV}`));

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});
>>>>>>> Stashed changes

module.exports = app;