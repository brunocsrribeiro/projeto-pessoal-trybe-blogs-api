const express = require('express');
const userController = require('../controllers/User');
const { Validated, findByEmail } = require('../middlewares/Validations/userValidations');

const usersRoutes = express.Router();

usersRoutes.post('/', Validated, findByEmail, userController.create);

module.exports = usersRoutes;
