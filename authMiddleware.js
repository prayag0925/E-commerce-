const jwt = require('jsonwebtoken');

// Verify JWT token from cookie and attach user info to request
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;        // { id, username, role }
    res.locals.user = decoded; // make user available in all EJS views
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

// Allow access only to admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).send('Access Denied: Admins only');
};

module.exports = { verifyToken, isAdmin };
