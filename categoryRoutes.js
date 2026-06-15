const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// All category routes require a logged-in user
router.use(verifyToken);

// View all categories
router.get('/', categoryController.getAllCategories);

// Add, edit, delete categories - admin only
router.post('/add', isAdmin, categoryController.addCategory);
router.post('/edit/:id', isAdmin, categoryController.updateCategory);
router.get('/delete/:id', isAdmin, categoryController.deleteCategory);

module.exports = router;
