const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const SECRET = process.env.JWT_SECRET;

const login = async (userData) => {
  const thisEmailExist = await User.findOne({
    where: {
      email: userData.email,
    },
    attributes: {
      excludes: ['password'],
    },
  });

  const token = jwt.sign(
    { data: thisEmailExist },
    SECRET,
    jwtConfig,
  );
  
  return { token };
};

module.exports = {
  login,
};