const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller.js');
const postsControoler = new PostsController();

const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, postsControoler.createPosts); // 게시글 생성
router.get("/", postsControoler.getPosts); // 게시글 조회
router.get("/:postId", postsControoler.getOnePost); // 게시글 상세 조회
router.put("/:postId", authMiddleware, postsControoler.updateOnePost);  // 게시글 수정
router.delete("/:postId", authMiddleware, postsControoler.deleteOnePost); // 게시글 삭제

module.exports = router;