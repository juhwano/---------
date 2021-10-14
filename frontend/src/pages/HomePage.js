import React from "react";
// import { useHistory } from "react-router";
import WriteButton from "../components/write/WriteButton";
import PostsListContainer from "../containers/posts/PostsListContainer";

function HomePage() {
  // const history = useHistory();
  return (
    <>
      <div>
        <PostsListContainer />
        <WriteButton />
      </div>
    </>
  );
}

export default HomePage;
