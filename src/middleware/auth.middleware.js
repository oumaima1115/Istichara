/*
Auth Middleware (auth.js)
Checks if the user is logged in.
Verifies JWT token from headers.
Attaches user info to req.user if valid.
Returns 401 Unauthorized if token is missing or invalid.
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. attach user to request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};