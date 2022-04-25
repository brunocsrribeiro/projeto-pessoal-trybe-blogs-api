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

const getById = async (categoryId) => {
  const getCategoryById = await Promise.all(
    categoryId.map((id) => Category.findByPk(id)),
  );

  return getCategoryById;
};

module.exports = {
  create,
  getAll,
  getById,
};
