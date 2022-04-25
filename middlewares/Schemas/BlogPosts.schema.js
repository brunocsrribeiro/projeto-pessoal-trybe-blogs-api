const Joi = require('joi');

const schemaBlogPost = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer()).required(),
});

module.exports = {
  schemaBlogPost,
};
