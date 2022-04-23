const { schemaCategory } = require('../Schemas/Category.schema');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaCategory.validate(validations);

  if (error) throw error;

  next();
};

module.exports = {
  Validated,
};
