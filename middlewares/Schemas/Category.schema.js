const Joi = require('joi');

const schemaCategory = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  schemaCategory,
};
