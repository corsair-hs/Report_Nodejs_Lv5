// Method -> Input Data Check (try-catch) -> Request) Service.Method -> Response) Message/Data to Client 

const PostsService = require('../services/posts.service.js');

class PostsController {
  postsService = new PostsService();

  // 게시글 생성
  addPostOne = async (req, res) => {
    try {
      // 입력 데이터
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      // 예외처리
      if (!title) {
        return res.status(412).json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다."});
      } else if (!content) {
        return res.status(412).json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
      };
      // 게시글 생성
      const { message, errorMessage } = await this.postsService.addPostOne(userId, title, content);
      if (message) {
        return res.status(200).json({ message });
      } else if (errorMessage) {
        return res.status(400).json({ errorMessage });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." })
    };
  };

  // 게시글 조회
  getPosts = async (req, res) => {
    const { posts, errorMessage } = await this.postsService.getPosts();
    if (posts) {
      return res.status(200).json({ posts });
    } else if (errorMessage) {
      return res.status(400).json({ errorMessage });
    };
  };

  // 게시글 상세조회
  getPostOne = async (req, res) => {
    try {
      const { postId } = req.params;
      const { post, errorMessage } = await this.postsService.getPostOne(postId);
      if (post) {
        return res.status(200).json({ post });
      } else if (errorMessage) {
        return res.status(400).json({ errorMessage });
      };
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." })
    };
  };

  // 게시글 수정
  updatePostOne = async (req, res) => {
    try {
      // 입력 데이터
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      // 예외처리
      // - 입력 데이터 예외처리
      if (!title) {
        return res.status(412).json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
      } else if (!content) {
        return res.status(412).json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
      };
      // 수정처리요청
      const { message, errorMessage } = await this.postsService.updatePostOne(postId, userId, title, content);
      if (message) {
        return res.status(200).json({ message });
      } else if (errorMessage) {
        return res.status(400).json({ errorMessage });
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
      const { message, errorMessage } = await this.postsService.deletePostOne( postId, userId );
      if (message) {
        return res.status(200).json({ message });
      } else if (errorMessage) {
        return res.status(400).json({ errorMessage });
      };
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    };
  };
};

module.exports = PostsController;