const comment = require('../../../models/comment');
const code = require('../../../modules/statusCode');

const commentController = {
  readAllComment: async (req, res) => {
    try {
      const result = await comment
        .find()
        .populate('writer', 'nickName profileImage');
      if (!result) {
        return res
          .status(code.BAD_REQUEST)
          .json({ message: '데이터가 없습니다.' });
      }
      res.status(code.OK).json({
        message: '게시물 전체조회 성공',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: '조회 실패',
      });
    }
  },
  readComment: async (req, res) => {
    const { commentId } = req.params;
    try {
      const result = await comment.findById(commentId);
      if (!result) {
        return res
          .status(code.NO_CONTENT)
          .json({ message: '데이터가 없습니다.' });
      }

      res.status(code.OK).json({
        message: '조회 성공',
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }
  },
  createComment: async (req, res) => {
    //토큰값 검증
    const userInfo = req.userInfo;
    const { commentContent } = req.body;
    const commentModel = new comment({
      commentWriter: userInfo._id,
      commentContent,
      commentDate: Date.now(),
    });

    try {
      const result = await commentModel.save();
      res.status(code.OK).json({
        message: '저장 성공',
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }
  },
  updateComment: async (req, res) => {
    const userInfo = req.userInfo;
    const { commentId } = req.params;
    const { commentContent } = req.body;

    const ownResult = await comment.checkAuth({
      commentId,
      writerId: userInfo._id,
    });
    if (ownResult === -1) {
      return res
        .status(code.FORBIDDEN)
        .json({ message: '접근 권한이 없습니다.' });
    } else if (ownResult === -2) {
      return res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }

    try {
      const result = await comment.findByIdAndUpdate(
        commentId,
        {
          commentId: userInfo._id,
          commentContent,
          commentDate: Date.now(),
        },
        { new: true }, // 업데이트 하고 난 후의 결과값 반환
      );
      res.status(code.OK).json({
        message: '수정 완료',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
        error,
      });
    }
  },
  deleteComment: async (req, res) => {
    const userInfo = req.userInfo;
    const { commentId } = req.params; // 댓글의 _id

    // 일치하는 회원인지 아닌지 확인

    const ownResult = await comment.checkAuth({
      commentId,
      writerId: userInfo._id,
    });
    console.log(ownResult);
    if (ownResult === -1) {
      return res
        .status(code.FORBIDDEN)
        .json({ message: '접근 권한이 없습니다.' });
    } else if (ownResult === -2) {
      return res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }

    try {
      await comment.findByIdAndDelete(commentId);
      res.status(code.OK).json({
        message: '삭제 성공',
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: 'DB 서버 에러',
      });
    }
  },
};

module.exports = commentController;
