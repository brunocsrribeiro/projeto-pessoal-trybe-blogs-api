const express = require('express');
const blogPostsController = require('../controllers/BlogPosts');
const { Validated } = require('../middlewares/Validations/blogPostValidations');
const { ValidationToken } = require('../middlewares/Auth/validateToken');
const { findByExistingCategory } = require('../middlewares/Validations/categoryValidations');

const blogPostRouter = express.Router();

blogPostRouter
  .post('/',
    Validated,
    ValidationToken,
    findByExistingCategory,
    blogPostsController.create)
  .get('/', ValidationToken, blogPostsController.getAll);

module.exports = blogPostRouter;
