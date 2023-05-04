// Method -> Process -> Request) Repository -> Response Data to Controller

const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();

  // 게시글 생성
  addPostOne = async (userId, title, content) => {
    try {
      await this.postsRepository.addPostOne(userId, title, content);
      return { message: "게시글 작성에 성공하였습니다." };
    } catch (err) {
      console.error(err);
      return { errorMessage: "게시글 작성에 실패하였습니다." }
    }
  };

  // 게시글 조회
  getPosts = async () => {
    try {
      const getPostsData = await this.postsRepository.getPosts();
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
      return { posts: setPostsData };
    } catch (err) {
      console.error(err);
      return { errorMessage: "게시글 조회에 실패하였습니다." }
    };
  };

  // 게시글 상세조회
  getPostOne = async (postId) => {
    try {
      const getPostOneData = await this.postsRepository.getPostOne(postId);
      const setPostOneData = {
        postId: getPostOneData.postId,
        userId: getPostOneData.UserId,
        nickname: getPostOneData.User.nickname,
        title: getPostOneData.title,
        content: getPostOneData.content,
        createdAt: getPostOneData.createdAt,
        updatedAt: getPostOneData.updatedAt
      };
      return { post: setPostOneData };
    } catch (err) {
      console.error(err);
      return { errorMessage: "게시글 조회에 실패하였습니다." }
    };
  };

  // 게시글 수정
  updatePostOne = async (postId, userId, title, content) => {
    try {
      // 게시글 찾기 with postId
      const getPostOneData = await this.postsRepository.getPostOne(postId);
      // 게시글 존재유무 및 수정권한 검증
      if (!getPostOneData) {
        return { errorMessage: "게시글이 존재하지 않습니다." };
      } else if (getPostOneData.UserId !== userId) {
        return { errorMessage: "게시글 수정 권한이 존재하지 않습니다." };
      };
      // 게시글 수정 요청
      await this.postsRepository.updatePostOne(postId, userId, title, content);
      return { message: "게시글을 수정하였습니다." };
    } catch (err) {
      console.error(err);
      return { errorMessage: "게시글이 정상적으로 수정되지 않았습니다." };
    };
  };

  // 게시글 삭제
  deletePostOne = async (postId, userId) => {
    try {
      // 게시글 찾기 with postId
      const getPostOneData = await this.postsRepository.getPostOne(postId);
      // 게시글 존재유무 및 삭제권한 검증
      if (!getPostOneData) {
        return { errorMessage: "게시글이 존재하지 않습니다." };
      } else if (getPostOneData.UserId !== userId) {
        return { errorMessage: "게시글 삭제 권한이 존재하지 않습니다." };
      };
      // 게시글 삭제 요청
      await this.postsRepository.deletePostOne(postId, userId);
      return { message: "게시글이 삭제되었습니다." };
    } catch (err) {
      console.error(err);
      return { errorMessage: "게시글이 정상적으로 삭제되지 않았습니다." };
    };
  };

};

module.exports = PostsService;