const { StatusCodes } = require('http-status-codes');
const { schemaBlogPost, schemaUpdateBlogPost } = require('../Schemas/BlogPosts.schema');
const blogPostServices = require('../../services/BlogPosts');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaBlogPost.validate(validations);
  
  if (error) throw error;
  
  next();
};

const ValidUpdate = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaUpdateBlogPost.validate(validations);

  if (error) throw error;

  next();
};

const findByExistingPost = async (req, res, next) => {
  const { id } = req.params;

  const thisPostExists = await blogPostServices.getById(id);
  
  if (!thisPostExists) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post does not exist' });
  }

  next();
};

const checkingUserPermission = async (req, res, next) => {
  const { id: idUser } = req.user;
  const { id } = req.params;
  const { dataValues } = await blogPostServices.checkingUserPermission(id);
  
  if (dataValues.userId !== idUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = {
  Validated,
  ValidUpdate,
  findByExistingPost,
  checkingUserPermission,
};
