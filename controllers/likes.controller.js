const LikesService = require('../services/likes.service.js');

class LikesController {
  likesService = new LikesService();

  // 좋아요 등록/삭제
  editLike = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const { num, msg } = await this.likesService.editLike(userId, postId);
      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 좋아요에 실패하였습니다." });
    };
  };

  // 좋아요 게시글 조회
  viewLike = async (req, res) => {
    try {
      res.locals.user;

      const { num, msg } = await this.likesService.viewLike();

      if (num === 200) {
        return res.status(num).json({ data: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." });
    };
  };
};

module.exports = LikesController;