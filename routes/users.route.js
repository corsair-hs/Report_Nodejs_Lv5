// Request) HTTP Method -> URL -> (authMiddleware) -> Controller.Method

const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();

router.post("/signup", usersController.signup);  // 회원가입
router.post("/login", usersController.login); // 로그인

module.exports = router;