const Joi = require('joi');

const schemaBlogPost = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer()).required(),
});

const schemaUpdateBlogPost = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().max(0).messages({ 'array.max': 'Categories cannot be edited' }),
});

module.exports = {
  schemaBlogPost,
  schemaUpdateBlogPost,
};
