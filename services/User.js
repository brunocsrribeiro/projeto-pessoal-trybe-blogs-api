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

const findByEmail = async (email) => {
  const thisEmailExist = await User.findOne({
    where: {
      email,
    },
  });

  return thisEmailExist;
};

module.exports = {
  create,
  findByEmail,
};
