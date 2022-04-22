const express = require('express');
const loginController = require('../controllers/Login');
const {
  ValidLogin,
  findByEmailNotExisting } = require('../middlewares/Validations/userValidations');

const loginRoutes = express.Router();

loginRoutes.post('/', ValidLogin, findByEmailNotExisting, loginController.login);

module.exports = loginRoutes;