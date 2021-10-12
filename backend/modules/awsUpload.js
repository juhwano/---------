let AWS = require('aws-sdk');
// 확장자명을 파싱할 수 있는
const path = require('path');
// 해당 경로에서 어떤 것을 불러오겠다
// config파일을 가져오겠다
// dirname : 지금 경로
AWS.config.loadFromPath(__dirname + '/../config/awsConfig.json'); //인증

// 새 S3객체
let s3 = new AWS.S3();
// 뮬터 초기화
let multer = require('multer');
// 뮬터S3 초기화
let multerS3 = require('multer-s3');

// 뮬터 옵션
let upload = multer({
  storage: multerS3({
    s3: s3,
    // 버킷 이름을 설정
    bucket: 'ssacs2',
    // 파일명을 반환
    key: function (req, file, cb) {
      // 파일의 오리지널네임 중복 방지, 현재시간으로 된 이미지 파일 업로드
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
});

module.exports = upload;
