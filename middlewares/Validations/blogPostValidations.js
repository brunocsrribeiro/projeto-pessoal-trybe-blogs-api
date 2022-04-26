const { StatusCodes } = require('http-status-codes');
const { schemaBlogPost } = require('../Schemas/BlogPosts.schema');
const blogPostServices = require('../../services/BlogPosts');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaBlogPost.validate(validations);

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

module.exports = {
  Validated,
  findByExistingPost,
};
