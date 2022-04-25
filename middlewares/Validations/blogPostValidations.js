const { schemaBlogPost } = require('../Schemas/BlogPosts.schema');
require('../Errors');

const Validated = (req, _res, next) => {
  const validations = req.body;

  const { error } = schemaBlogPost.validate(validations);

  if (error) throw error;

  next();
};

module.exports = {
  Validated,
};
