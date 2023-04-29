// Method -> DB Query -> Response Data to Service

const { Comments, Users } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {

  // 댓글 추가
  addCmtOne = async (userId, postId, comment) => {
    return await Comments.create({ UserId: userId, PostId: postId, comment });
  }

  // 댓글 조회
  getCmts = async (postId) => {
    const getCmtsData = await Comments.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"]
        }
      ],
      where: { postId },
      order: [['createdAt', 'DESC']],
    });

    const setCmtsData = getCmtsData.map((item) => {
      return {
        commentId: item.commentId,
        userId: item.UserId,
        nickname: item.User.nickname,
        comment: item.comment,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    });

    return setCmtsData;
  };

  // 댓글 조회 (with commentId)
  getCmtOne = async (commentId) => {
    const getCmtOneData = await Comments.findOne({
      include: [
        {
          model: Users,
          attributes: ["nickname"]
        }
      ],
      where: { commentId },
      order: [['createdAt', 'DESC']],
    });

    const setCmtOneData = {
      commentId: getCmtOneData.commentId,
      postId: getCmtOneData.PostId,
      userId: getCmtOneData.UserId,
      nickname: getCmtOneData.User.nickname,
      comment: getCmtOneData.comment,
      createdAt: getCmtOneData.createdAt,
      updatedAt: getCmtOneData.updatedAt
    };

    return setCmtOneData;
  };

  // 댓글 수정
  updateCmtOne = async (userId, postId, commentId, comment) => {
    return await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ commentId }, { PostId: postId }, { UserId: userId }]
        }
      }
    );
  };

  // 댓글 삭제
  deleteCmtOne = async (userId, postId, commentId) => {
    return await Comments.destroy(
      {
        where: {
          [Op.and]: [{ commentId }, { PostId: postId }, { UserId: userId }]
        }
      }
    );
  };

};

module.exports = CommentsRepository;