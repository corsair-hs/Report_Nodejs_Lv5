const PostsService = require('../services/posts.service.js');

class PostsController {
  postsService = new PostsService();

  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      // 검증 프로세스 추후 추가
      await this.postsService.createPost(userId, title, content);
      return res.status(200).json({ message: "게시글 작성에 성공하였습니다."})
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    };
  };
};

module.exports = PostsController;