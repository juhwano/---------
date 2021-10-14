const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/lov/auth/authController');
const authModule = require('../../../modules/authModule');
const upload = require('../../../modules/awsUpload');
// (토큰 필요)
// 로그인 유저 정보 받아오기
router.get('/profile', authModule.loggedIn, authController.readUser);
// 회원 정보 수정
router.put('/profile', authModule.loggedIn, authController.updateUser);
//이미지 업로드
router.post('/image', upload.single('img'), authController.uploadImage);

// 회원 삭제
router.delete('/profile', authModule.loggedIn, authController.deleteUser);

//(토큰 필요 X)
// 로그인
router.post('/signin', authController.signInUser);

// 전체 유저 조회
router.get('/', authController.readAllUser);
// 회원가입
router.post('/signup', authController.signUpUser);
// 메일 발송
router.post('/mail', authController.sendEmail);

module.exports = router;
