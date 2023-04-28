const express = require('express');
const router = express.Router();

const UsersRouter = require('./users.route.js');
const PostsRouter = require('./posts.route.js');
// const CommentsRouter = require('./comments.route.js');
// const LikesRouter = require('./likes.route.js');

router.use('/', UsersRouter);
router.use('/posts', PostsRouter);
// router.use('/posts', CommentsRouter);
// router.use('/', LikesRouter);

module.exports = router;