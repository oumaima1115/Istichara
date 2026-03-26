/*
coupon.router.js - Coupon Routes

- GET /coupon → get all coupons
- POST /coupon → create a new coupon
- PUT /coupon/:id → update coupon details
- DELETE /coupon/:id → delete coupon
*/
const express = require('express');
const router = express.Router();

// Import controller
const couponController = require('../controllers/coupon.controller');

// Import middlewares
// const authMiddleware = require('../middleware/auth.middleware');
// const roleMiddleware = require('../middleware/role.middleware');

// Routes (Protected for lawyer only)

// GET /coupon → get all coupons
router.get(
    '/',
    // authMiddleware,
    // roleMiddleware('lawyer'),
    couponController.getAll
);

// POST /coupon → create a new coupon
router.post(
    '/',
    // authMiddleware,
    // roleMiddleware('lawyer'),
    couponController.create
);

// PUT /coupon/:id → update coupon details
router.put(
    '/:id',
    // authMiddleware,
    // roleMiddleware('lawyer'),
    couponController.update
);

// DELETE /coupon/:id → delete coupon
router.delete(
    '/:id',
    // authMiddleware,
    // roleMiddleware('lawyer'),
    couponController.delete
);

module.exports = router;