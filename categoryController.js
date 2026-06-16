const Category = require('../models/Category');


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};


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


exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
