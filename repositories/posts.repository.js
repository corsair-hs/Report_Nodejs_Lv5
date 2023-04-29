// Method -> DB Query -> Response Data to Service

const { Users, Posts } = require("../models");
const { Op } = require("sequelize");

class PostsRepository {

  // 게시글 추가
  addPostOne = async (userId, title, content) => {
    return await Posts.create({ UserId: userId, title, content });
  };

  // 게시글 조회
  getPosts = async () => {
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

    const setPostsData = getPostsData.map((item) => {
      return {
        postId: item.postId,
        userId: item.UserId,
        nickname: item.User.nickname,
        title: item.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    });

    return setPostsData;
  };

  // 게시글 상세 조회
  getPostOne = async (postId) => {
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

    const setPostOneData = {
      postId: getPostOneData.postId,
      userId: getPostOneData.UserId,
      nickname: getPostOneData.User.nickname,
      title: getPostOneData.title,
      content: getPostOneData.content,
      createdAt: getPostOneData.createdAt,
      updatedAt: getPostOneData.updatedAt
    };

    return setPostOneData;
  };

  // 게시글 수정
  updatePostOne = async (postId, userId, title, content) => {
    return await Posts.update(
      { title, content },
      {
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        }
      }
    )
  };

  // 게시글 삭제
  deletePostOne = async ( postId, userId ) => {
    return await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { UserId: userId }],
      }
    });
  };
  
};

module.exports = PostsRepository;