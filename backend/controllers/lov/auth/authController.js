const user = require('../../../models/user');
const code = require('../../../modules/statusCode');
const jwtModule = require('../../../modules/jwtModule');
const nodemailer = require('nodemailer');
const nodemailerSecretkey = require('../../../config/mailConfig.json');

const authController = {
  readAllUser: async (req, res) => {
    try {
      const result = await user.find();
      res.status(code.OK).json({
        message: '유저 전체 조회 성공',
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '서버 에러',
      });
    }
  },
  readUser: (req, res) => {
    //토큰 정보 가져오기(클라이언트에서 header에 토큰 담아서 넘겨주면 토큰 decode 후 email로 검색해서 같은 email 유저 정보가 담긴 토큰 반환)
    const userInfo = req.userInfo;

    //토큰 조회 후 같은 회원 정보가 존재할 때, 정보를 가져온다.
    if (userInfo) {
      res.status(code.OK).json({
        message: '특정 유저 조회 성공',
        data: userInfo,
      });
    } else {
      res.status(code.BAD_REQUEST).json({
        message: '특정 유저 조회 실패',
      });
    }
  },
  signUpUser: async (req, res) => {
    const { email, password, nickName } = req.body;
    try {
      const result = await user.findOne({ email });
      console.log(result);
      if (!result) {
        //중복 아이디 미존재
        const userModel = new user({ email, password, nickName });

        await userModel.save();
        res.status(code.OK).json({
          message: '회원가입 성공',
          data: userModel,
        });
      } else {
        //중복 아이디 존재
        res.status(code.CONFLICT).json({
          message: '중복 아이디 존재',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '서버 에러',
      });
    }
  },
  signInUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      //요청된 이메일을 DB에서 찾기
      const result = await user.findOne({ email });
      if (result) {
        // 유저 정보 존재할 때 -> 암호화된 비밀번호 체크
        result.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // 비밀번호 틀릴때
            return res
              .status(code.BAD_REQUEST)
              .json({ message: '비밀번호가 틀렸습니다.' });
          }
          //페이로드 생성
          const payload = {
            email: result.email,
            verified: result.verified,
          };
          // 토큰 생성할 때 페이로드 넘겨주기
          const token = jwtModule.create(payload);
          // 쿠키에 토큰 저장, 리턴값도 토큰
          res.status(code.OK).json({
            message: '로그인 성공',
            accessToken: token,
          });
        });
      } else {
        //로그인 실패 >> 유저 정보 존재하지 않음
        res.status(code.NOT_FOUND).json({
          message: '로그인 실패',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }
  },
  updateUser: async (req, res) => {
    const userInfo = req.userInfo;
    try {
      const { type, age, gender, degree, inoDate, imgURL } = req.body;

      const result = await user.findByIdAndUpdate(
        userInfo._id,
        {
          type, //백신 종류
          age,
          gender,
          degree, //접종 차수
          inoDate,
          profileImage: imgURL,
          verified: true,
        },
        { new: true },
      );
      // 페이로드 생성
      const payload = {
        email: result.email,
        verified: result.verified,
      };
      // 토큰 생성
      const token = jwtModule.create(payload);

      res.status(code.OK).json({
        message: '수정 성공',
        // data: result,
        accessToken: token,
      });
    } catch (error) {
      console.error(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '수정 실패',
        error,
      });
    }
  },
  deleteUser: async (req, res) => {
    const userInfo = req.userInfo;
    try {
      await user.findByIdAndDelete(userInfo._id);
      res.status(code.OK).json({
        message: '삭제 성공',
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '삭제 실패',
        error,
      });
    }
  },
  sendEmail: async (req, res) => {
    const { email } = req.body;
    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: nodemailerSecretkey.user,
        pass: nodemailerSecretkey.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log(smtpTransport);
    const mailOptions = {
      from: nodemailerSecretkey.user,
      to: email,
      subject: '비밀번호 재설정',
      text: '비밀번호 재설정',
    };
    console.log(mailOptions);
    try {
      await smtpTransport.sendMail(mailOptions);
      smtpTransport.close();
      res.status(code.OK).json({
        message: '메일 발송 성공',
      });
    } catch (error) {
      console.error(error);
      res.status(code.BAD_REQUEST).json({
        message: '메일 발송 실패',
      });
    }
  },
  uploadImage: (req, res) => {
    // 업로드하고 난 후 결과물
    const img = req.file;
    if (img) {
      res.status(200).json({
        message: '이미지 업로드 완료',
        imgUrl: img.location,
      });
    } else {
      res.status(400).json({
        message: '이미지 업로드 실패',
      });
    }
  },
};

module.exports = authController;
