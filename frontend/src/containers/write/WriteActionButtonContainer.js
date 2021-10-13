import React, { useContext, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import WriteActionButton from "../../components/write/WriteActionButton";
import client from "../../libs/api/_client";
import { toast } from "react-toastify";
import PostContext from "../../context/PostContext";
export const url = "http://localhost:3000";

// StyledButton cyan onClick={onPublish}>
//         게시물 {isEdit ? "수정" : "등록"}
//       </StyledButton>
const WriteActionButtonsContainer = ({ history }) => {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const [isEdit, setIsEdit] = useState(false);
  // isEdit을 분기처리
  const token = localStorage.getItem("accessToken");
  const { path } = useParams();
  const onPublish = async () => {
    try {
      if (isEdit) {
        // true(수정)
        // postId <- params
        client.defaults.headers.common["Authorization"] = token;
        const response = await client.post(`/post/${path}`, postInfo);
        console.log("response", response);
        //에러 핸들링
        if (response.status === 200) {
          console.log("글수정 성공");
          toast.dark("🚀글수정 완료 !");
          setPostInfo({
            title: "",
            content: "",
            tags: [],
            category: "",
          });
          setIsEdit(false);

          history.push("/");
        }
      } else {
        //false(등록)
        client.defaults.headers.common["Authorization"] = token;
        const response = await client.post("/post", postInfo);
        console.log("response", response);
        //에러 핸들링
        if (response.status === 200) {
          console.log("글쓰기 성공");
          toast.dark("🚀글쓰기 완료 !");
          setPostInfo({
            title: "",
            content: "",
            tags: [],
            category: "",
          });
          setIsEdit(true);

          history.push("/");
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.error(error);
        console.log("🔥중복 게시글이 존재합니다.");
      } else if (error.response.status === 404) {
        console.error(error);
        console.log("경로 오류");
      } else {
        console.error(error);
      }
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <WriteActionButton
      isEdit={isEdit}
      onPublish={onPublish}
      onCancel={onCancel}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
