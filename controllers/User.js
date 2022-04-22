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

module.exports = {
  create,
};
