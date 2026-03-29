/*
review.router.js - Review Routes

- GET /reviews → Get all reviews by role: (lawyer or client)
- POST /reviews → create a review for a lawyer (client only)
- PUT /reviews/:id → update a review (client only)
- DELETE /reviews/:id → delete a review (client only)
- Handles rating (1-5) and comment validation 
*/

// review.router.js - Review Routes

const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get(
  '/',
  authMiddleware,
  reviewController.getAll
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('client'),
  reviewController.create
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('client'),
  reviewController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('client'),
  reviewController.remove
);

module.exports = router;