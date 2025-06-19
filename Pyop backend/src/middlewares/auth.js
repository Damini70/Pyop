// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from the header

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
