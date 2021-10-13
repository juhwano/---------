import React, { useContext, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
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

  // 카테고리 type 숫자일 시 진행(1)
  // const dropDownMap = {
  //   후기 : 0,
  //   팁 : 1,
  //   등등: 2,
  // }

  // 카테고리 type 숫자일 시 진행(2)
  // return 해당 object 키 반환
  // function getKeyByValue(object, value){
  //   return Object.keys(object).find((key) => object[key] === value);
  // }

  // 카테고리 type 숫자일 시 진행(3)
  // category: getKeyByValue{dropDownMap, category},

  useEffect(() => {
    const { originalPostId } = postInfo;
    if (originalPostId) {
      //수정
      setIsEdit(true);
      try {
        async function getData() {
          //content 가져오는 통신
          const response = await client.get(`/post/${postInfo.originalPostId}`);
          const result = response.data.data;
          const { title, content, tags, category } = result;
          console.log(title, content, tags, category);
          setPostInfo({
            ...postInfo,
            title,
            content: content,
            tags,
            category,
          });
        }
        getData();
      } catch (error) {
        console.error(error);
      }
    } else {
      //등록
      setIsEdit(false);
    }
  }, []);

  // isEdit을 분기처리
  const token = localStorage.getItem("accessToken");
  const onPublish = async () => {
    try {
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
        setIsEdit(false);

        history.push("/");
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
