const User = require('../models/User');

// --------------------------------------------------
// GET /profile → full user data (client or lawyer)
// --------------------------------------------------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password');
    //   .populate('reviews');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// --------------------------------------------------
// GET /users → lawyers with pagination + filter + sort
// --------------------------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    // query params
    const {
      page = 1,
      limit = 10,
      specialty,
      sortBy = 'createdAt',
      order = 'asc'
    } = req.query;

    // filter
    let filter = { role: 'lawyer' };

    if (specialty) {
      filter.specialty = specialty;
    }

    // sort
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // pagination
    const skip = (page - 1) * limit;

    const lawyers = await User.find(filter)
      .select('-password')
    //   .populate('reviews')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      data: lawyers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lawyers',
      error: error.message
    });
  }
};

// --------------------------------------------------
// PUT /profile
// --------------------------------------------------
exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    delete updates.password;
    delete updates.role;
    delete updates.reviews;

    if (req.user.role !== 'lawyer') {
      delete updates.specialty;
      delete updates.calendar;
      delete updates.price;
      delete updates.cases_won;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated',
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// --------------------------------------------------
// DELETE /profile
// --------------------------------------------------
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};