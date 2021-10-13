const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 스키마,모델 작성
const userSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true },
  nickName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String, default: null },
  age: { type: Number, default: null },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  degree: { type: Number, default: 0 },
  inoDate: { type: Date, default: null },
  verified: { type: Boolean, default: false },
  profileImage: { type: String, default: null },
  // googleId: { type: String, unique: true },
  // naverId: { type: String, unique: true },
});

// Pre - 몽구스의 middleware기능이다
// - init, validate, save, remove 메소드 수행시 처리되는 미들웨어 펑션이다
// - 복잡한 유효성검사, 트리거 이벤트 처리, 에러 핸들링등. 예로 사용자를 삭제하면 사용자 관련 블로그포스트도 삭제하기같은 경우 사용

// 비밀번호 암호화
userSchema.pre('save', function (next) {
  // this -> userSchemaa
  const user = this;
  // 비밀번호를 바꿀 때만 암호화
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // password를 hash암호로 교체
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 암호화 비밀번호 일치 체크
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword를 암호화 후 db와 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, isMatch);
    }
  });
};

// 모듈화
module.exports = mongoose.model('User', userSchema);
