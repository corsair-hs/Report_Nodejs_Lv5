// Method -> Input Data Check (try-catch) -> Request) Service.Method -> Response) Message/Data to Client 

const PostsService = require('../services/posts.service.js');

class PostsController {
  postsService = new PostsService();

  // 게시글 생성
  addPostOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      const { num, msg } = await this.postsService.addPostOne(userId, title, content);
      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." })
    };
  };

  // 게시글 조회
  getPosts = async (req, res) => {
    const { num, msg } = await this.postsService.getPosts();
    if (num === 200) {
      return res.status(num).json({ posts: msg });
    } else {
      return res.status(num).json({ errorMessage: msg });
    };
  };

  // 게시글 상세조회
  getPostOne = async (req, res) => {
    try {
      const { postId } = req.params;
      const { num, msg } = await this.postsService.getPostOne(postId);
      if (num === 200) {
        return res.status(num).json({ post: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." })
    };
  };

  // 게시글 수정
  updatePostOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      const { num, msg } = await this.postsService.updatePostOne(postId, userId, title, content);
      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      };
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." })
    };
  };

  // 게시글 삭제
  deletePostOne = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { num, msg } = await this.postsService.deletePostOne( postId, userId );
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

module.exports = PostsController;