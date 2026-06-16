const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};


exports.postRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;

  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

  
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


exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};


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

    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.render('login', { error: 'Something went wrong, please try again' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
