import React from "react";
import Responsive from "../components/common/Responsive";
import EditorContainer from "../containers/write/EditorContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonContainer from "../containers/write/WriteActionButtonContainer";
import WriteDropDownContainer from "../containers/write/WriteDropDownContainer";
import BlockBox from "../components/common/block/BlockBox";

function WirtePage() {
  return (
    <Responsive>
      <BlockBox height={"3rem"} className="wrtieBlock" />
      <WriteDropDownContainer className="writeDropDown" />
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonContainer />
    </Responsive>
  );
}

export default WirtePage;
