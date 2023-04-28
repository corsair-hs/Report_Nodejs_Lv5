const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();

  createPost = async ( userId, title, content ) => {
    const createPostData = await this.postsRepository.create( userId, title, content );

    return {
      postId: createPostData.null,
      userId: createPostData.userId,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt
    };
  };
};

module.exports = PostsService;