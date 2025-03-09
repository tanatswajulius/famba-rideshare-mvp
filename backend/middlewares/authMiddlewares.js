// /backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.driverOnly = (req, res, next) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Access denied: Drivers only' });
  }
  next();
};

exports.riderOnly = (req, res, next) => {
  if (req.user.role !== 'rider') {
    return res.status(403).json({ message: 'Access denied: Riders only' });
  }
  next();
};
