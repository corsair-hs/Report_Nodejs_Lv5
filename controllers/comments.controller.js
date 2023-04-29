// Method -> Input Data Check (try-catch) -> Request) Service.Method -> Response) Message/Data to Client 

const CommentsService = require('../services/comments.service.js');

class CommentsController {
  commentsService = new CommentsService();

  // 댓글 생성
  addCmtOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { comment } = req.body;

      const { num, msg } = await this.commentsService.addCmtOne(userId, postId, comment);

      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    };
  };

  // 댓글 조회
  getCmts = async (req, res) => {
    try {
      const { postId } = req.params;

      const { num, msg } = await this.commentsService.getCmts(postId);

      if (num === 200) {
        return res.status(num).json({ comments: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "" });
    };
  };

  // 댓글 수정
  updateCmtOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body;

      const { num, msg } = await this.commentsService.updateCmtOne(postId, userId, commentId, comment);

      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    };
  };

  // 댓글 삭제
  deleteCmtOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;

      const { num, msg } = await this.commentsService.deleteCmtOne(postId, userId, commentId);
      
      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    };
  };

};

module.exports = CommentsController;