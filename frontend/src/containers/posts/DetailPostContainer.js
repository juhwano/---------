import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailPost from "../../components/posts/DetailPost";
import client from "../../libs/api/_client";

function DetailPostContainer() {
  const props = useParams();
  const postId = props.postId;
  const [post, setPost] = useState({});
  const [writer, setWriter] = useState("");
  const [writerInfo, setWriterInfo] = useState({});
  useEffect(() => {
    async function getPost() {
      if (postId !== null) {
        try {
          const response = await client.get(`/post/${postId}`);
          setPost(response.data.data);
          setWriter(response.data.data.writer);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getPost();

    async function getWriter() {
      if (writer !== null) {
        try {
          const response = await client.get(`/auth/info`, writer);
          const writerInfo = response.data.data;
          setWriterInfo(writerInfo);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getWriter();
  }, [setPost, setWriter]);

  return <DetailPost post={post} writer={writerInfo} />;
}

export default DetailPostContainer;
