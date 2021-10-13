import React, { useContext } from "react";
import Editor from "../../components/write/Editor";
import PostContext from "../../context/PostContext";

function EditorContainer() {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const { title, content } = postInfo;
  // tag, title, content, category
  const onChangeField = (payload) => {
    const { key, value } = payload;
    setPostInfo({
      ...postInfo,
      [key]: value,
    });
  };

  return (
    <Editor title={title} content={content} onChangeField={onChangeField} />
  );
}

export default EditorContainer;
