// Method -> DB Query -> Response Data to Service

const { Users, Posts } = require("../models");
const { Op } = require("sequelize");

class PostsRepository {

  // 게시글 추가
  addPostOne = async (userId, title, content) => {
    try {
      return await Posts.create({ UserId: userId, title, content });
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 게시글 조회
  getPosts = async () => {
    try {
      const getPostsData = await Posts.findAll({
        attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      return getPostsData;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 게시글 상세 조회
  getPostOne = async (postId) => {
    try {
      const getPostOneData = await Posts.findOne({
        attributes: ["postId", "UserId", "title", "content", "createdAt", "updatedAt"],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
        where: { postId }
      });
      return getPostOneData;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 게시글 수정
  updatePostOne = async (postId, userId, title, content) => {
    try {
      return await Posts.update(
        { title, content },
        {
          where: {
            [Op.and]: [{ postId }, { UserId: userId }],
          }
        }
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 게시글 삭제
  deletePostOne = async (postId, userId) => {
    try {
      return await Posts.destroy({
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        }
      });
    } catch (err) {
      console.error(err);
      return null;
    };
  };

  
};

module.exports = PostsRepository;