/*
user.router.js - User Management Routes

- GET /profile → get current user profile
- GET /users → get all lawyers (only accessible to clients)
- PUT /profile → update user profile
- DELETE /profile → delete user account
- Handles authentication and role-based access
*/

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get(
    '/profile',
    authMiddleware,
    userController.getProfile
);

// pagination + filter + sort
// example:
// /users?page=1&limit=5&specialty=criminal&sortBy=cases_won&order=desc
router.get(
    '/users',
    authMiddleware,
    roleMiddleware('client'),
    userController.getAllUsers
);

router.put(
    '/profile',
    authMiddleware,
    userController.updateProfile
);

router.delete(
    '/profile',
    authMiddleware,
    userController.deleteProfile
);

module.exports = router;