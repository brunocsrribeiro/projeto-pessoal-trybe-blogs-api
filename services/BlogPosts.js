const Sequelize = require('sequelize');
const config = require('../config/config');
const { decodedToken } = require('../middlewares/Auth/validateToken');
const { BlogPost, PostsCategory } = require('../models');
require('dotenv/config');

const sequelize = new Sequelize(config.development);

const create = async ({ title, content, categoryIds }, tokenUser) => {
  const transaction = await sequelize.transaction();

  try {
    const decoded = decodedToken(tokenUser);

    const { dataValues: { id, userId } } = await BlogPost
      .create({ title, content, categoryIds, userId: decoded.data.id }, { transaction });

    await Promise.all(categoryIds.map((categoryId) => PostsCategory
      .create({ postId: id, categoryId }, { transaction })));

    await transaction.commit();

    return { id, userId, title, content };
  } catch (error) {
    await transaction.rollback();
  }
};

const getAll = async (blogPostData) => {
  const getAllBlogPosts = await BlogPost.findAll(blogPostData);

  return getAllBlogPosts;
};

module.exports = {
  create,
  getAll,
};
