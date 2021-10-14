import React, { useContext, useEffect, useState } from "react";
import PostsList from "../../components/posts/PostsList";
import PostsContext from "../../context/PostsContext";
import client from "../../libs/api/_client";

function PostsListContainer() {
  const { postInfo, setPostInfo } = useContext(PostsContext);

  useEffect(() => {
    try {
      async function getData() {
        //content 가져오는 통신
        const response = await client.get(`/post`);
        const result = response.data.data;
        setPostInfo({ posts: result });
      }
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [setPostInfo]);

  return <PostsList posts={postInfo.posts} />;
}

export default PostsListContainer;
