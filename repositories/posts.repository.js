const { Posts } = require("../models");

class PostsRepository {
  createPost = async ( userId, title, content ) => {
    const createPostData = await Posts.create({ UserId: userId, title, content});
    return createPostData;
  }
};

module.exports = PostsRepository;