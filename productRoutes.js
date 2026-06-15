const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

// All product routes require a logged-in user
router.use(verifyToken);

// Product listing routes
router.get('/', productController.getAllProducts);
router.get('/my-products', productController.getMyProducts);

// Add product
router.get('/add', productController.getAddProductForm);
router.post('/add', productController.postAddProduct);

// Edit product
router.get('/edit/:id', productController.getEditProductForm);
router.post('/edit/:id', productController.postUpdateProduct);

// Delete product
router.get('/delete/:id', productController.deleteProduct);

// Single product detail (keep this route last so it doesn't catch other routes)
router.get('/:id', productController.getProductItem);

module.exports = router;
