import React, { useContext } from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";
import palette from "../../libs/styles/palette";
import { BsPlusLg } from "react-icons/bs";
import { useHistory } from "react-router";
import PostsContext from "../../context/PostsContext";

const StyledButton = styled(ButtonComponent)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${palette.cyan[5]};
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  &:hover {
    background-color: ${palette.cyan[4]};
  }
`;

const StyledIcon = styled(BsPlusLg)`
  font-size: 2rem;
  vertical-align: bottom;
`;

function WriteButton() {
  const history = useHistory();
  const { postInfo, setPostInfo } = useContext(PostsContext);
  return (
    <StyledButton>
      <StyledIcon
        onClick={() => {
          // setPostInfo({
          //   ...postInfo,
          //   originalPostId: "61668cd21e2c4fc006c7978d",
          // });

          history.push("/write");
        }}
      />
    </StyledButton>
  );
}

export default WriteButton;
