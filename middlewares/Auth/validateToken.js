const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const decodedToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    console.error(error.message);
  }
};

const ValidationToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = decodedToken(token);
    const { dataValues } = await User.findOne({ where: { displayName: decoded.data.displayName } });
    
    req.user = dataValues;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  ValidationToken,
  decodedToken,
};
