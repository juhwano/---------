import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
  const [postInfo, setPostInfo] = useState({
    tags: [],
    title: "",
    content: "",
    category: "",
    originalPostId: "",
  });

  const resetPost = () => {
    setPostInfo({
      tags: [],
      title: "",
      content: "",
      category: "",
      originalPostId: "",
    });
  };

  return (
    <PostContext.Provider
      value={{
        postInfo,
        setPostInfo,
        resetPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
