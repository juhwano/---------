import React from "react";
import { useHistory } from "react-router";
import WriteButton from "../components/write/WriteButton";

function HomePage() {
  const history = useHistory();

  const onClickModify = () => {
    history.push("/write");
  };

  return (
    <>
      <div>
        <WriteButton onClick={onClickModify} />
      </div>
      <div>
        <button>게시물 수정</button>
      </div>
    </>
  );
}

export default HomePage;
