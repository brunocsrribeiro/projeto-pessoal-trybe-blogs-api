const express = require('express');
const userController = require('../controllers/User');
const {
  Validated,
  findByExistingEmail,
  findByExistingUser } = require('../middlewares/Validations/userValidations');
const validationToken = require('../middlewares/Auth/validateToken');

const usersRoutes = express.Router();

usersRoutes
  .post('/', Validated, findByExistingEmail, userController.create)
  .get('/', validationToken, userController.getAll)
  .get('/:id', validationToken, findByExistingUser, userController.getById);
  
module.exports = usersRoutes;
