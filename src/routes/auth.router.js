/*
auth.router.js - Authentication Routes

- POST /signup → create a new user (client or lawyer)
- POST /login → user login, return JWT token
- POST /logout → logout user
- Handles input validation and error responses 
*/

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.post(
    '/signup',
    upload.array('profilePic'),
    authController.signup
);

router.post('/login', authController.login);

router.post('/logout', authMiddleware, authController.logout);

module.exports = router;