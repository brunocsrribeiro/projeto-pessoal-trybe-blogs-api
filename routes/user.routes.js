const express = require('express');
const userController = require('../controllers/User');
const {
  Validated,
  findByExistingEmail,
  findByExistingUser } = require('../middlewares/Validations/userValidations');
const { ValidationToken } = require('../middlewares/Auth/validateToken');

const usersRoutes = express.Router();

usersRoutes
  .post('/', Validated, findByExistingEmail, userController.create)
  .get('/', ValidationToken, userController.getAll)
  .get('/:id', ValidationToken, findByExistingUser, userController.getById);
  
module.exports = usersRoutes;
