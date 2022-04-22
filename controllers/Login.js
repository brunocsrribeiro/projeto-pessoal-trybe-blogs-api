const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/Login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginCreate = await loginService.login({ email, password });

    return res.status(StatusCodes.OK).json(loginCreate);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};