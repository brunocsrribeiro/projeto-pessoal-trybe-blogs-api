const express = require('express');
const blogPostsController = require('../controllers/BlogPosts');
const { Validated,
    findByExistingPost,
    ValidUpdate, 
    checkingUserPermission } = require('../middlewares/Validations/blogPostValidations');
const { ValidationToken } = require('../middlewares/Auth/validateToken');
const { findByExistingCategory } = require('../middlewares/Validations/categoryValidations');

const blogPostRouter = express.Router();

blogPostRouter
  .post('/',
    Validated,
    ValidationToken,
    findByExistingCategory,
    blogPostsController.create)
  .get('/', ValidationToken, blogPostsController.getAll)
  .get('/search', ValidationToken, blogPostsController.getAllSearch)
  .get('/:id', ValidationToken, findByExistingPost, blogPostsController.getById)
  .put('/:id',
    ValidUpdate,
    ValidationToken,
    findByExistingPost,
    checkingUserPermission,
    blogPostsController.update)
  .delete('/:id',
    ValidationToken,
    findByExistingPost,
    checkingUserPermission,
    blogPostsController.deleted);

module.exports = blogPostRouter;
