const express = require('express');
const loginController = require('../controllers/Login');
const { ValidLogin, findByUser } = require('../middlewares/Validations/userValidations');

const loginRoutes = express.Router();

loginRoutes.post('/', ValidLogin, findByUser, loginController.login);

module.exports = loginRoutes;