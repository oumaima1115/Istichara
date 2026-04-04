const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------------------------------------------
// POST /signup
// --------------------------------------------------
exports.signup = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
      specialty,
      days,
      startTime,
      endTime,
      price,
      cases_won
    } = req.body;

    // ✅ parse days if it comes as string
    if (days && typeof days === 'string') {
      days = JSON.parse(days);
    }

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = {
      name,
      email,
      password: hashedPassword,
      role,
      profilePic: req.file ? req.file.filename : null
    };

    if (role === 'attorney') {
      userData.specialty = specialty || null;
      userData.calendar = {
        days: days || [],
        startTime: startTime || null,
        endTime: endTime || null
      };
      userData.price = parseFloat(price) || 0;
      userData.cases_won = parseInt(cases_won) || 0;
    }

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please log in to continue.'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message
    });
  }
};
// --------------------------------------------------
// POST /login
// --------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// --------------------------------------------------
// POST /logout
// --------------------------------------------------
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
};