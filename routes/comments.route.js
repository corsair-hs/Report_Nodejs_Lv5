// Request) HTTP Method -> URL -> (authMiddleware) -> Controller.Method

const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const CommentsController = require('../controllers/comments.controller.js');
const commentsController = new CommentsController();

router.post("/posts/:postId/comments", authMiddleware, commentsController.addCmtOne);  // 댓글 생성
router.get("/posts/:postId/comments", commentsController.getCmts);  // 댓글 조회
router.put("/posts/:postId/comments/:commentId", authMiddleware, commentsController.updateCmtOne);  // 댓글 수정
router.delete("/posts/:postId/comments/:commentId", authMiddleware, commentsController.deleteCmtOne);  // 댓글 제거

module.exports = router;