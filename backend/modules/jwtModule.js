const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret.json');

const jwtModule = {
  //jwt 토큰 생성
  create: (payload) => {
    const option = {
      algorithm: jwtSecret.algorithm,
      expiresIn: '7d',
      issuer: 'lov',
    };
    // 파라미터(페이로드, 시크릿키, 옵션) -> 페이로드는 컨트롤러에서 설정
    const token = jwt.sign(payload, jwtSecret.secretKey, option);
    return token;
  },
  //jwt 토큰 검증
  verify: (token) => {
    let decoded;
    try {
      //파라미터(토큰, 시크릿키)
      decoded = jwt.verify(token, jwtSecret.secretKey);
    } catch (error) {
      console.error(error);
      if (error.message === 'jwt expired') {
        console.log('expired token');
        return -1;
      } else if (error.message === 'invalid token') {
        console.log('invalid token');
        return -2;
      } else {
        console.log('error token');
        return -3;
      }
    }
    console.log('decoded', decoded);
    return decoded;
  },
};
module.exports = jwtModule;
