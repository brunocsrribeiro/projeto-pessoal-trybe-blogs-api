const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const ValidationToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({ where: { displayName: decoded.data.displayName } });

    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = ValidationToken;
