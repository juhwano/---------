import React, { useState } from "react";
import styled from "styled-components";

// const StyledContainer = styled.div`
//   position: absolute;
//   bottom: 0rem;
// `;

const StyledForm = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2em;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
`;

export default function ChatInput({ userName, socket }) {
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = (e) => {
    console.log("e", e);
    e.preventDefault();
    console.log("메세지 보내는 곳");
    console.log(userName);
    socket.emit("onSend", {
      userName,
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    // <StyledContainer>
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        placeholder="메시지를 입력하세요."
        value={chatMessage}
        onChange={onChatMessageChange}
      ></StyledInput>
      <StyledButton>전송</StyledButton>
    </StyledForm>
    // </StyledContainer>
  );
}
