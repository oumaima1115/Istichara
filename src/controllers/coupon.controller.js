const Coupon = require('../models/Coupon');
const validateCoupon = require('../utils/validateCoupon');

// GET / → get all coupons
exports.getAll = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
};

// POST / → create a new coupon
exports.create = async (req, res) => {
  try {
    // 1️⃣ Validate input first
    const errors = validateCoupon(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const { code, expirationDate, discountPercentage } = req.body;

    // 2️⃣ Check duplicate code
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists'
      });
    }

    // 3️⃣ Create coupon
    const coupon = await Coupon.create({
      code,
      expirationDate,
      discountPercentage
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating coupon',
      error: error.message
    });
  }
};

// PUT /:id → update coupon
exports.update = async (req, res) => {
  try {
    // 1️⃣ Validate input first
    const errors = validateCoupon(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const { id } = req.params;
    const { code, expirationDate, discountPercentage } = req.body;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    // Optional: check if new code already exists
    if (code && code !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ code });
      if (existingCoupon) {
        return res.status(400).json({
          success: false,
          message: 'Coupon code already in use'
        });
      }
    }

    // Update only provided fields
    if (code) coupon.code = code;
    if (expirationDate) coupon.expirationDate = expirationDate;
    if (discountPercentage !== undefined)
      coupon.discountPercentage = discountPercentage;

    const updatedCoupon = await coupon.save();

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      data: updatedCoupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating coupon',
      error: error.message
    });
  }
};

// DELETE /:id → delete coupon
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting coupon',
      error: error.message
    });
  }
};