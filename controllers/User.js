const { StatusCodes } = require('http-status-codes');
const userService = require('../services/User');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const created = await userService.create({ displayName, email, password, image });

    return res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const getAllUsers = await userService.getAll({ displayName, email, password, image });

    return res.status(StatusCodes.OK).json(getAllUsers);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getUserById = await userService.getById(id);

    return res.status(StatusCodes.OK).json(getUserById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
