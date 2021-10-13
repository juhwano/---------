import React from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";

const WriteActionButtonWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(ButtonComponent)`
  font-size: 1.3rem;
  padding: 0.7rem 1rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ isEdit, onCancel, onPublish }) => {
  return (
    <WriteActionButtonWrapper>
      <StyledButton cyan onClick={onPublish}>
        게시물 {isEdit ? "수정" : "등록"}
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonWrapper>
  );
};

export default WriteActionButtons;
