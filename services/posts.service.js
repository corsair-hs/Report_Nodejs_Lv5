// Method -> Process -> Request) Repository -> Response Data to Controller

const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();

  // 게시글 생성
  addPostOne = async (userId, title, content) => {
    try {
      // 입력 데이터 검증
      if (!title) {
        return { num: 412, msg: "게시글 제목의 형식이 일치하지 않습니다." };
      } else if (!content) {
        return { num: 412, msg: "게시글 내용의 형식이 일치하지 않습니다." };
      };
      await this.postsRepository.addPostOne(userId, title, content);
      return { num: 201, msg: "게시글 작성에 성공하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글 작성에 실패하였습니다."}
    }
  };

  // 게시글 조회
  getPosts = async () => {
    try {
      const data = await this.postsRepository.getPosts();
      return { num: 200, msg: data };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글 조회에 실패하였습니다."}
    };
  };

  // 게시글 상세조회
  getPostOne = async ( postId ) => {
    try {
      const data = await this.postsRepository.getPostOne( postId );
      return { num: 200, msg: data }; 
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글 조회에 실패하였습니다."}
    };
  };

  // 게시글 수정
  updatePostOne = async ( postId, userId, title, content ) => {
    try {
      // 인풋값 검증
      if (!title) {
        return { num: 412, msg: "게시글 제목의 형식이 일치하지 않습니다." };
      } else if (!content) {
        return { num: 412, msg: "게시글 내용의 형식이 일치하지 않습니다." };
      };

      // getPostOne with postId
      const getPostOneData = await this.postsRepository.getPostOne( postId );

      // 게시글 존재유무 및 수정권한 검증
      if (!getPostOneData) {
        return { num: 400, msg: "게시글이 존재하지 않습니다." };
      } else if (getPostOneData.userId !== userId) {
        return { num: 400, msg: "게시글 수정 권한이 존재하지 않습니다." };
      };
      await this.postsRepository.updatePostOne( postId, userId, title, content );
      return { num: 200, msg: "게시글을 수정하였습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글이 정상적으로 수정되지 않았습니다."};
    };
  };

  // 게시글 삭제
  deletePostOne = async ( postId, userId ) => {
    try {
      // getPostOne with postId
      const getPostOneData = await this.postsRepository.getPostOne( postId );

      // 게시글 존재유무 및 수정권한 검증
      if (!getPostOneData) {
        return { num: 400, msg: "게시글이 존재하지 않습니다." };
      } else if (getPostOneData.userId !== userId) {
        return { num: 400, msg: "게시글 삭제 권한이 존재하지 않습니다." };
      };

      await this.postsRepository.deletePostOne( postId, userId );

      return { num: 200, msg: "게시글이 삭제되었습니다." };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글이 정상적으로 삭제되지 않았습니다." };
    };
  };

};

module.exports = PostsService;