/*Role Middleware (role.js)
Checks if the user role matches allowed roles for the route.
Example: only lawyer can access certain routes.
Returns 403 Forbidden if role is not authorized.
*/

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // check if user exists (auth middleware should run before)
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      // check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: access denied'
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Role middleware error',
        error: error.message
      });
    }
  };
};