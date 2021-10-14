import React from "react";
import { useContext } from "react";
import TagBox from "../../components/write/TagBox";
import PostsContext from "../../context/PostsContext";

const TagBoxContainer = () => {
  const { postInfo, setPostInfo } = useContext(PostsContext);
  const tags = postInfo.tags;

  const onChangeTags = (nextTags) => {
    setPostInfo({
      ...postInfo,
      tags: nextTags,
    });
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
