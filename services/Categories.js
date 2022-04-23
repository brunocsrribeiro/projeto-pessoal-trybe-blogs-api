const { Category } = require('../models');
require('dotenv/config');

const create = async (categoryData) => {
  const createdCategory = await Category.create(categoryData);
  
  return createdCategory;
};

module.exports = {
  create,
};
