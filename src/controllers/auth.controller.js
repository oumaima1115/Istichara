const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------------------------------------------
// POST /signup
// --------------------------------------------------
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      specialty,
      profilePic,
      calendar,
      price,
      cases_won
    } = req.body;

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // check email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // build user object based on role
    let userData = {
      name,
      email,
      password: hashedPassword,
      role,
      profilePic: profilePic || null
    };

    // add lawyer-only fields
    if (role === 'lawyer') {
      userData.specialty = specialty || null;
      userData.calendar = calendar || {};
      userData.price = price || 0;
      userData.cases_won = cases_won || 0;
    }

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully'
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