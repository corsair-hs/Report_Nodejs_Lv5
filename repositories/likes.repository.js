// Method -> DB Query -> Response Data to Service

const { Likes, Users, Posts, sequelize } = require("../models");
const { Op } = require("sequelize");
class LikesRepository {

  // 좋아요 찾기
  getLikeOne = async ( userId, postId ) => {
    return await Likes.findOne({ where: { [Op.and]: [{ PostId: postId}, { UserId: userId}] }});
  };

  // 좋아요 등록
  addLikeOne = async ( userId, postId ) => {
    return await Likes.create({ PostId: postId, UserId: userId});
  };

  // 좋아요 삭제
  delLikeOne = async ( userId, postId ) => {
    return await Likes.destroy({ where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] }});
  };

  // 좋아요 게시글 조회
  getPostsWithLikes = async ( userId ) => {
    const getPostsWithLikes = await Likes.findAll({
      attributes: [
        ['PostId', 'postId'], 
        ['UserId', 'userId'], 
        [sequelize.literal('(SELECT nickname FROM Users WHERE Users.userId = (SELECT UserId FROM Posts WHERE Posts.postId = Likes.PostId))'), 'nickname'],
        [sequelize.literal('(SELECT title FROM Posts WHERE Posts.postId = Likes.PostId)'), 'title'],
        'createdAt', 
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('PostId')), 'like'],
      ],
      group: ['PostId'],
    });

    return getPostsWithLikes;
  };
};

module.exports = LikesRepository;