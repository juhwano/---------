const mongoose = require('mongoose');
const { Schema } = mongoose;
// 스키마,모델 작성
const postSchema = new Schema({
  title: { type: String, default: null, required: true },
  content: { type: String, default: null, required: true },
  category: { type: String, default: null },
  tags: [{ type: String, default: null }],
  publishedDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
  writer: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'User' },
  // comments: [
  //   {
  //     commentWriter: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       default: null,
  //       ref: "User",
  //     },
  //     commentContent: { type: String, default: null },
  //     commentDate: { type: Date, default: Date.now() },
  //   },
  // ],
});
// 글작성자와 로그인유저 비교
// this => model을 가르킴
postSchema.statics.checkAuth = async function (params) {
  const { postId, writerId } = params;
  console.log(postId, writerId);
  try {
    const ownResult = await this.findOne({ _id: postId }); // 게시물의 _id
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

// 모듈화
module.exports = mongoose.model('Post', postSchema);
