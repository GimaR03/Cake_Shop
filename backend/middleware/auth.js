const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Development mode bypass (no token required)
  if (process.env.NODE_ENV === "development" && !req.headers.authorization) {
    req.user = { id: "admin", role: "admin" };
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token missing" });

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });

      req.user = user;
      next();
    }
  );
};

module.exports = { authenticateToken };
