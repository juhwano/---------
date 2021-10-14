import React, { useContext } from "react";
import PostsList from "../../components/posts/PostsList";
import PostsContext from "../../context/PostsContext";

function PostsListContainer() {
  const { postInfo, setPostInfo } = useContext(PostsContext);
  return <PostsList posts={postInfo.posts} />;
}

export default PostsListContainer;
