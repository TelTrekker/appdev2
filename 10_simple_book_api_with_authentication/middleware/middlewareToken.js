//JWT middleware
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.JWT_SECRET;

// Generate JWT Token
const generateAccessToken = (email) => {
  return jwt.sign({ email }, tokenSecret, { expiresIn: '1800s' }); // 30 mins
};

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
    res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = {
  generateAccessToken,
  verifyToken
};