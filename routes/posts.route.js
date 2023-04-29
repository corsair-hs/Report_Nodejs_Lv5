// Request) HTTP Method -> URL -> (authMiddleware) -> Controller.Method

const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require('../controllers/posts.controller.js');
const LikesController = require('../controllers/likes.controller.js');

const postsController = new PostsController();
const likesController = new LikesController();

router.post("/posts", authMiddleware, postsController.addPostOne);  // 게시글 생성
router.get("/posts", postsController.getPosts); // 게시글 조회
router.get("/posts/like", authMiddleware, likesController.viewLike); // 좋아요 게시글 조회
router.get("/posts/:postId", postsController.getPostOne); // 게시글 상세조회
router.put("/posts/:postId", authMiddleware, postsController.updatePostOne); // 게시글 수정
router.delete("/posts/:postId", authMiddleware, postsController.deletePostOne); // 게시글 삭제

module.exports = router;