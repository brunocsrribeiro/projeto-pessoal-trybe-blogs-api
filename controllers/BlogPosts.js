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

const getAll = async (_req, res, next) => {
  try {
    const getAllBlogPosts = await blogPostService.getAll();

    return res.status(StatusCodes.OK).json(getAllBlogPosts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getAllBlogPosts = await blogPostService.getById(id);

    return res.status(StatusCodes.OK).json(getAllBlogPosts);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    const updateBlogPosts = await blogPostService.update({
        id,
        title,
        content,
        categoryIds,
    });

    return res.status(StatusCodes.OK).json(updateBlogPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};