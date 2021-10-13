import React, { useContext } from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import PostContext from "../../context/PostContext";

function WriteDropDownContainer() {
  const options = ["후기", "팁", "기타"];

  const { postInfo, setPostInfo } = useContext(PostContext);

  const defaultOption = postInfo.category;

  const onChangeDropDown = (payload) => {
    // console.log("dropdown값", payload.value);
    const dropdownValue = payload.value;
    setPostInfo({
      ...postInfo,
      category: dropdownValue,
    });
    console.log("포스트 전체값", postInfo);
  };

  return (
    <WriteDropDown
      options={options}
      onChangeDropDown={onChangeDropDown}
      defaultOption={defaultOption}
    />
  );
}

export default WriteDropDownContainer;
