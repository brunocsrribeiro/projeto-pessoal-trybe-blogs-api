const Joi = require('joi');

const schemaUsers = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().empty().required(),
  password: Joi.string().length(6).empty().required(),
});

module.exports = {
  schemaUsers,
  schemaLogin,
};
