const express = require('express');
const router = express.Router();

const UsersRouter = require('./users.route.js');
const PostsRouter = require('./posts.route.js');

router.use('/', UsersRouter);
router.use('/posts', PostsRouter);

module.exports = router;