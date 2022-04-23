const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/Categories');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const created = await categoryService.create({ name });

    return res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { name } = req.body;

    const getAllCategories = await categoryService.getAll({ name });

    return res.status(StatusCodes.OK).json(getAllCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
