// Method -> Process -> Request) Repository -> Response Data to Controller

const CommentsRepository = require('../repositories/comments.repository.js');
const PostsRepository = require('../repositories/posts.repository.js');

class CommentsService {
  commentsRepository = new CommentsRepository();
  postsRepository = new PostsRepository();

  // 댓글 생성
  addCmtOne = async ( userId, postId, comment ) => {
    try {
      // 게시글 유무 검증
      const getPostOne = await this.postsRepository.getPostOne( postId );
      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      };
      // 댓글 생성 요청
      await this.commentsRepository.addCmtOne( userId, postId, comment );
      return { num: 200, msg: "댓글을 작성하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "댓글 작성에 실패하였습니다." };
    };
  };

  // 댓글 조회
  getCmts = async ( postId ) => {
    try {
      const getPostOne = await this.postsRepository.getPostOne( postId );
      // 게시글 유무 검증
      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      };
      // 댓글 조회 요청
      const getCmtsData = await this.commentsRepository.getCmts( postId );
      return { num: 200, msg: getCmtsData };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "댓글 조회에 실패하였습니다." };
    };
  };

  // 댓글 수정
  updateCmtOne = async ( postId, userId, commentId, comment ) => {
    try {
      const getPostOne = await this.postsRepository.getPostOne( postId );
      const getCmtOne = await this.commentsRepository.getCmtOne( commentId );

      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      } else if (!getCmtOne) {
        return { num: 404, msg: "댓글이 존재하지 않습니다." };
      } else if (comment.length === 0){
        return { num: 400, msg: "데이터 형식이 올바르지 않습니다." };
      } else if ( userId !== getCmtOne.userId ) {
        return { num: 403, msg: "댓글의 수정 권한이 존재하지 않습니다." };
      };

      await this.commentsRepository.updateCmtOne ( postId, userId, commentId, comment );
      return { num: 200, msg: "댓글을 수정하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "댓글 수정에 실패하였습니다." };
    };
  };

  // 댓글 삭제
  deleteCmtOne = async ( postId, userId, commentId ) => {
    try {
      const getPostOne = await this.postsRepository.getPostOne( postId );
      const getCmtOne = await this.commentsRepository.getCmtOne( commentId );

      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      } else if (!getCmtOne) {
        return { num: 404, msg: "댓글이 존재하지 않습니다." };
      } else if ( userId !== getCmtOne.userId ) {
        return { num: 403, msg: "댓글의 삭제 권한이 존재하지 않습니다." };
      };
      await this.commentsRepository.deleteCmtOne ( postId, userId, commentId );
      return { num: 200, msg: "댓글을 삭제하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "댓글 삭제에 실패하였습니다." };
    };
  };

};

module.exports = CommentsService;