const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const Joi = require('joi');

const error = (err, _req, res, _next) => {
  const errorJoi = Joi.isError(err);

  if (errorJoi) {
    const errors = {
      error: err.details[0].type === 'any.required',
      errorString: err.details[0].type === 'string.min',
      errorStringEmail: err.details[0].type === 'string.email',
      errorStringPassword: err.details[0].type === 'string.length',
    };

    if (Object.keys(errors)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
};

module.exports = {
    error,
};
