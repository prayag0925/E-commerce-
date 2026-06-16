const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');


router.use(verifyToken);


router.get('/', productController.getAllProducts);
router.get('/my-products', productController.getMyProducts);


router.get('/add', productController.getAddProductForm);
router.post('/add', productController.postAddProduct);


router.get('/edit/:id', productController.getEditProductForm);
router.post('/edit/:id', productController.postUpdateProduct);


router.get('/delete/:id', productController.deleteProduct);


router.get('/:id', productController.getProductItem);

module.exports = router;
