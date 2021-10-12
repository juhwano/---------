const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/lov/post/postController");
const authModule = require("../../../modules/authModule");

// 인증이 필요없음(미들웨어 사용x)
// 모든 게시물 조회
router.get("/", postController.readAllBoard);
// 특정 게시물 조회
router.get("/:postId", postController.readBoard);

// 인증이 필요함(미들웨어 사용)
// 게시물 작성
router.post("/", authModule.loggedIn, postController.createBoard);
// 게시물 수정
router.put("/:postId", authModule.loggedIn, postController.updateBoard);
// 게시물 삭제
router.delete("/:postId", authModule.loggedIn, postController.deleteBoard);

module.exports = router;
