const { StatusCodes } = require('http-status-codes');
const blogPostService = require('../services/BlogPosts');

const create = async (req, res, next) => {
  const tokenUser = req.headers.authorization;

  try {
    const { title, content, categoryIds } = req.body;

    const created = await blogPostService.create({
      title,
      content,
      categoryIds,
    }, tokenUser);

    return res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getAllBlogPosts = await blogPostService.getAll(id);

    return res.status(StatusCodes.OK).json(getAllBlogPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};