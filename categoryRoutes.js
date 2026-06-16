const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


router.use(verifyToken);

router.get('/', categoryController.getAllCategories);


router.post('/add', isAdmin, categoryController.addCategory);
router.post('/edit/:id', isAdmin, categoryController.updateCategory);
router.get('/delete/:id', isAdmin, categoryController.deleteCategory);

module.exports = router;
