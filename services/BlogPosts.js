const Sequelize = require('sequelize');
const config = require('../config/config');
const { decodedToken } = require('../middlewares/Auth/validateToken');
const { BlogPost, PostsCategory, User, Category } = require('../models');
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

const getAll = async () => {
  const getAllBlogPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  return getAllBlogPosts;
};

const getById = async (id) => {
  const getBlogPostById = await BlogPost.findByPk(id, {
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });

  return getBlogPostById;
};

const checkingUserPermission = async (id) => {
  const checking = await BlogPost.findByPk(id, {
    where: {
      id,
    },
  });

  return checking;
};

const update = async ({ id, title, content, categoryIds }) => {
  await BlogPost.update(
    { title, content, categoryIds },
    { where: { id } },
  );

  const { dataValues } = await BlogPost.findByPk(id, {
    where: { id },
    include: [
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });
  
  return dataValues;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  checkingUserPermission,
};
