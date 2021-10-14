import { useState } from "react";
import PostsContext from "../PostsContext";

const PostsProvider = ({ children }) => {
  const [postInfo, setPostInfo] = useState({
    posts: [
      {
        _id: "111",
        title: "제목",
        content: "콘텐츠",
        category: "후기",
        tags: [],
      },
    ],
  });

  return (
    <PostsContext.Provider
      value={{
        postInfo,
        setPostInfo,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
