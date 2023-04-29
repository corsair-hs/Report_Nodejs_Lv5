// Request) HTTP Method -> URL -> (authMiddleware) -> Controller.Method

const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const LikesController = require('../controllers/likes.controller.js');
const likesController = new LikesController();

router.put("/posts/:postId/like", authMiddleware, likesController.editLike);  // 좋아요 등록/삭제
// router.get("/posts/like", authMiddleware, likesController.viewLike); // 좋아요 게시글 조회

module.exports = router;