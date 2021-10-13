const mongoose = require('mongoose');
const { Schema } = mongoose;
// 스키마,모델 작성
const commentSchema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    commentWriter: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: 'User',
    },
    parentCommnet: { type: mongoose.Schema.Types.ObjectId, ref: 'comment' },
    commentContent: { type: String, default: null, required: true },
    isDeleted: { type: Boolean, default: false },
    commentDate: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    likes: { type: Number, default: 0 },
  },
  {
    toObject: { viruals: true },
  },
);

// 댓글작성자와 로그인유저 비교
// this => model을 가르킴
commentSchema.statics.checkAuth = async function (params) {
  const { commentId, writerId } = params;
  console.log(commentId, writerId);
  try {
    const ownResult = await this.findOne({ _id: commentId }); // 댓글의 _id
    const ownId = ownResult.writer._id;
    if (ownId.toString() !== writerId.toString()) {
      return -1;
    }
    return 1;
  } catch (error) {
    console.error(error);
    return -2;
  }
};

commentSchema
  .virtual('childComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (value) {
    this._childComments = value;
  });

// 모듈화
module.exports = mongoose.model('Commnet', commentSchema);
