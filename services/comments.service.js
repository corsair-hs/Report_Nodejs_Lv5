// Method -> Process -> Request) Repository -> Response Data to Controller

const CommentsRepository = require('../repositories/comments.repository.js');
const PostsRepository = require('../repositories/posts.repository.js');

class CommentsService {
  commentsRepository = new CommentsRepository();
  postsRepository = new PostsRepository();

  // 댓글 생성
  addCmtOne = async ( userId, postId, comment ) => {
    try {
      const getPostOne = await this.postsRepository.getPostOne( postId );
      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      };
      await this.commentsRepository.addCmtOne( userId, postId, comment );
      return { num: 200, msg: "댓글을 작성하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "댓글 작성에 실패하였습니다." };
    };
  }

};

module.exports = CommentsService;