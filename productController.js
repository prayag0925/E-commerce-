const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const mongoose = require('mongoose');


exports.getAllProducts = async (req, res) => {
  try {
    const categories = await Category.find();
    const filter = {};

   
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


exports.getAddProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('productForm', { categories, product: null });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};


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

  
    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: savedProduct._id }
    });

    res.redirect('/products/my-products');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};


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


    await User.findByIdAndUpdate(product.addedBy, {
      $pull: { products: product._id }
    });

    res.redirect('/products/my-products');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
