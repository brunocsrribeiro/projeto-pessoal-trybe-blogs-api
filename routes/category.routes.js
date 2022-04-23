const express = require('express');
const categoryController = require('../controllers/Categories');
const { Validated } = require('../middlewares/Validations/categoryValidations');
const validationToken = require('../middlewares/Auth/validateToken');

const categoryRouter = express.Router();

categoryRouter
  .post('/', Validated, validationToken, categoryController.create);

module.exports = categoryRouter;
