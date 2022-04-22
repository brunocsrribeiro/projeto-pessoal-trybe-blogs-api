const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const jwtConfig = {
  algorithm: 'HS256',
};

const SECRET = process.env.JWT_SECRET;

const create = async (userData) => {
  const createUser = await User.create(userData);

  const { password, ...userWithouPassword } = createUser;

  const token = jwt.sign(
    { data: userWithouPassword },
    SECRET,
    jwtConfig,
  );
  
  return { token };
};

const findByExistingEmail = async (email) => {
  console.log(email);
  const thisEmailExist = await User.findOne({
    where: {
      email,
    },
  });

  return thisEmailExist;
};

const getAll = async (userData) => {
  const getAllUsers = await User.findAll(userData, {
    attributes: {
      exclude: ['password'],
    },
  });

  return getAllUsers;
};

const getById = async (id) => {
  const getUserById = await User.findByPk(id, {
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  });

  return getUserById;
};

module.exports = {
  create,
  getAll,
  getById,
  findByExistingEmail,
};
