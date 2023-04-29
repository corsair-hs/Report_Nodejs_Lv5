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

      const { num, msg } = await this.commentsService.addCmtOne( userId, postId, comment );

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