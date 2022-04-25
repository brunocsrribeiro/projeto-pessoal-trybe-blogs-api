const express = require('express');
const categoryController = require('../controllers/Categories');
const { Validated } = require('../middlewares/Validations/categoryValidations');
const { ValidationToken } = require('../middlewares/Auth/validateToken');

const categoryRouter = express.Router();

categoryRouter
  .post('/', Validated, ValidationToken, categoryController.create)
  .get('/', ValidationToken, categoryController.getAll);

module.exports = categoryRouter;
