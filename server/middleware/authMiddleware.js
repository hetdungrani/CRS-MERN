const jwt = require('jsonwebtoken');

// Middleware to protect admin routes
exports.protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized as admin' });
    }

    req.admin = decoded; // Attach admin info to request
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log error for debugging
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
};