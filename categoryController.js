const Category = require('../models/Category');

// GET /categories -> show all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// POST /categories/add -> add new category (admin only)
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.redirect('/categories');
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.redirect('/categories');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// POST /categories/edit/:id -> update category (admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect('/categories');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// GET /categories/delete/:id -> delete category (admin only)
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
