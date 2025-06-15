//JWT middleware
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const tokenSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized: No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Received token:", token);
    console.log("Secret:", tokenSecret);
    res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = {
  verifyToken
};