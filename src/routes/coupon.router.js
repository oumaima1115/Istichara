/*
coupon.router.js - Coupon Routes

- GET /coupon → get all coupons
- POST /coupon → create a new coupon
- PUT /coupon/:id → update coupon details
- DELETE /coupon/:id → delete coupon
*/
const express = require('express');
const router = express.Router();

const couponController = require('../controllers/coupon.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get(
    '/',
    authMiddleware,
    couponController.getAll
);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('lawyer'),
    couponController.create
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('lawyer'),
    couponController.update
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('lawyer'),
    couponController.delete
);

module.exports = router;