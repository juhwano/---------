const user = require('../models/user');
const jwtModule = require('./jwtModule');
const code = require('../modules/statusCode');

//여기서 verified 체크
const authModule = {
  loggedIn: async (req, res, next) => {
    //클라이언트에서 토큰을 가져온다.
    const token = req.headers.authorization;
    //토큰이 없으면
    if (!token) {
      return res.status(code.NOT_FOUND).json({
        message: '토큰 없음',
      });
    }
    //토큰이 있으면 복호화 한 후 유저를 찾는다.
    const decoded = jwtModule.verify(token);
    if (decoded === -1) {
      return res.status(code.INVALID_TOKEN).json({
        messagse: '만료된 토큰',
      });
    } else if (decoded === -2) {
      return res.status(code.INVALID_TOKEN).json({
        message: '유효하지 않은 토큰',
      });
    } else if (decoded === -3) {
      return res.status(code.INVALID_TOKEN).json({
        message: '토큰 에러.',
      });
    }
    // verified가 true가 되지 않더라도 보여주고 싶다.
    // http://localhost:3000/api/auth/profile
    // path : profile
    // if (!decoded.verified) {
    //   if (req.path !== '/profile') {
    //     return res.status(401).json({
    //       message: '추가 정보 입력 필요',
    //     });
    //   }
    // }
    //추가 정보 미 입력
    // if (decoded.verified === false) {
    //   return res.status(code.UNAUTHORIZED).json({
    //     message: '추가 정보 미 입력',
    //   });
    // }
    //검증이 끝나면 토큰 사용하기
    let userInfo;
    // 토큰의 email로 db email 찾기
    try {
      userInfo = await user.findOne({ email: decoded.email });
    } catch (error) {
      return res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '유효하지 않은 유저',
      });
    }
    //찾은 값을 req.userInfo 변수에 담아준다.
    req.userInfo = userInfo;
    console.log('찾은 유저값', req.userInfo);
    //전체 토큰
    req.token = decoded;
    // 다음 미들웨어로 넘겨준다.
    next();
  },
};

module.exports = authModule;
