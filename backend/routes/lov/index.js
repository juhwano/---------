const express = require('express');
const router = express.Router();
const authRouter = require('../lov/auth/index');
const postRouter = require('../lov/post/index');
const commentRouter = require('../lov/comment/index');

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports = router;
