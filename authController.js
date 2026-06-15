const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /register -> show registration form
exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};

// POST /register -> create new user
exports.postRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user'
    });

    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.render('register', { error: 'Something went wrong, please try again' });
  }
};

// GET /login -> show login form
exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

// POST /login -> authenticate user and issue JWT cookie
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    // Create JWT token with user id, username and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send token as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.render('login', { error: 'Something went wrong, please try again' });
  }
};

// GET /logout -> clear cookie and redirect to login
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
