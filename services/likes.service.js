const LikesRepository = require('../repositories/likes.repository.js');
const PostsRepository = require('../repositories/posts.repository.js');

class LikesService {
  likesRepository = new LikesRepository;
  postsRepository = new PostsRepository;

  // 좋아요 등록/삭제
  editLike = async (userId, postId) => {
    try {
      // 게시글 유무 검증
      const getPostOne = await this.postsRepository.getPostOne(postId);
      if (!getPostOne) {
        return { num: 404, msg: "게시글이 존재하지 않습니다." };
      };
      // 좋아요 유무 검증
      const getLikeOne = await this.likesRepository.getLikeOne(userId, postId);
      if (!getLikeOne) {
        await this.likesRepository.addLikeOne(userId, postId);
        return { num: 200, msg: "게시글의 좋아요를 등록하였습니다." };
      } else {
        await this.likesRepository.delLikeOne(userId, postId);
        return { num: 200, msg: "게시글의 좋아요를 취소하였습니다." };
      }
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "게시글 좋아요에 실패하였습니다." };
    };
  };

  viewLike = async () => {
    try {
      const getPostsWithLikes = await this.likesRepository.getPostsWithLikes();
      return { num: 200, msg: getPostsWithLikes };
    } catch (err) {
      console.error(err);
      return { num: 400, msg: "좋아요 게시글 조회에 실패하였습니다." };
    };
  };

};

module.exports = LikesService;
