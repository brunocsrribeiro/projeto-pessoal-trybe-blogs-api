const { StatusCodes } = require('http-status-codes');
const { schemaCategory } = require('../Schemas/Category.schema');
const categoryService = require('../../services/Categories');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaCategory.validate(validations);

  if (error) throw error;

  next();
};

const findByExistingCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  const thisCategoryExists = await categoryService.getById(categoryIds);

  if (thisCategoryExists[0] === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  Validated,
  findByExistingCategory,
};
