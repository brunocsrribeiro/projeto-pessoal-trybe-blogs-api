const { Category } = require('../models');
require('dotenv/config');

const create = async (categoryData) => {
  const createdCategory = await Category.create(categoryData);
  
  return createdCategory;
};

const getAll = async (categoryData) => {
  const getAllCategories = await Category.findAll(categoryData);

  return getAllCategories;
};

module.exports = {
  create,
  getAll,
};
