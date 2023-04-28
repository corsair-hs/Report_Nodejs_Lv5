const express = require('express');
const router = express.Router();

const UsersRouter = require('./users.route.js');

router.use('/', UsersRouter);

module.exports = router;