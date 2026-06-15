const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const mongoose = require('mongoose');

// GET /products -> show all products (with optional category filter)
exports.getAllProducts = async (req, res) => {
  try {
    const categories = await Category.find();
    const filter = {};

    // Only apply the category filter if a valid category id was selected
    if (req.query.category && mongoose.Types.ObjectId.isValid(req.query.category)) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .populate('category')
      .populate('addedBy', 'username');

    res.render('productList', {
      products,
      categories,
      selectedCategory: req.query.category || ''
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /products/my-products -> show products added by logged-in user
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ addedBy: req.user.id })
      .populate('category');

    res.render('myProducts', { products });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /products/add -> show add product form
exports.getAddProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('productForm', { categories, product: null });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// POST /products/add -> add a new product for logged-in user
exports.postAddProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      addedBy: req.user.id
    });

    const savedProduct = await newProduct.save();

    // Add product reference to the user's products array (multiuser support)
    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: savedProduct._id }
    });

    res.redirect('/products/my-products');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /products/:id -> show single product detail
exports.getProductItem = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('addedBy', 'username');

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('productItem', { product });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /products/edit/:id -> show edit form (only owner or admin)
exports.getEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();

    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
    }

    res.render('productForm', { categories, product });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// POST /products/edit/:id -> update product (only owner or admin)
exports.postUpdateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    await product.save();
    res.redirect('/products/my-products');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /products/delete/:id -> delete product (only owner or admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
    }

    await Product.findByIdAndDelete(req.params.id);

    // Remove product reference from owner's products array
    await User.findByIdAndUpdate(product.addedBy, {
      $pull: { products: product._id }
    });

    res.redirect('/products/my-products');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
