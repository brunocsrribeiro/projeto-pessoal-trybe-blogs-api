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

const findByExistingEmail = async (req, res, next) => {
  const { email } = req.body;

  const thisEmailExists = await userServices.findByExistingEmail(email);
  
  if (thisEmailExists) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
  }

  next();
};

const findByEmailNotExisting = async (req, res, next) => {
  const { email, password } = req.body;

  const thisEmailExists = await userServices.findByExistingEmail(email);

  if (!thisEmailExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  if (thisEmailExists.dataValues.password !== password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password invalid' });
  }

  next();
};

const findByExistingUser = async (req, res, next) => {
  const { id } = req.params;

  const thisUserExists = await userServices.getById(id);

  if (!thisUserExists) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' });
  }

  next();
};

module.exports = {
  Validated,
  ValidLogin,
  findByExistingEmail,
  findByEmailNotExisting,
  findByExistingUser,
};
