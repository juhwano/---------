const express = require('express');
const router = express.Router();
const commentController = require('../../../controllers/lov/comment/commentController');
const authModule = require('../../../modules/authModule');

// 인증이 필요없음(미들웨어 사용x)
// 모든 댓 조회
router.get('/', commentController.readAllComment);
// 특정 댓글 조회
router.get('/:commentId', commentController.readComment);

// 인증이 필요함(미들웨어 사용)
// 댓글 작성
router.post('/', authModule.loggedIn, commentController.createComment);
// 댓글 수정
router.put('/:commentId', authModule.loggedIn, commentController.updateComment);
// 댓글 삭제
router.delete(
  '/:commentId',
  authModule.loggedIn,
  commentController.deleteComment,
);

module.exports = router;
