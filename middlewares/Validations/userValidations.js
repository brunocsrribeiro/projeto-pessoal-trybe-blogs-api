const { StatusCodes } = require('http-status-codes');
const { schemaUsers, schemaLogin } = require('../Schemas/User.schema');
const userServices = require('../../services/User');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaUsers.validate(validations);

  if (error) throw error;

  next();
};

const ValidLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = schemaLogin.validate({ email, password });

  if (error) throw error;

  next();
};

const findByEmail = async (req, res, next) => {
  const { email } = req.body;

  const thisEmailExists = await userServices.findByEmail(email);
  
  if (thisEmailExists) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
  }

  next();
};

const findByUser = async (req, res, next) => {
  const { email } = req.body;

  const thisEmailExists = await userServices.findByEmail(email);
  
  if (!thisEmailExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = {
  Validated,
  ValidLogin,
  findByEmail,
  findByUser,
};
