import React, { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

const StyledContainer = styled.div`
  /* width: 100vw; */
  height: 32rem;
  /* padding: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInnerContainer = styled.div`
  width: 40%;
  height: 70%;
  border: 1px solid black;
  /* border-radius: 1rem; */
  overflow: auto;
`;

const StyledChatBlock = styled.div`
  border: 1px solid black;
  /* overflow: auto; */
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledChatInputBlock = styled.div`
  display: flex;
  height: 5%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledChat = styled.div`
  display: flex;
  /* flex-direction: ; */
  justify-content: space-around;

  align-items: center;
  width: 100%;
  /* height: 20%; */
  border-bottom: 1px solid sandybrown;
  /* border-radius: 1rem; */
`;

const StyledChatLog = styled.div`
  margin-left: 100px;
`;

export default function ChatComponent({
  chatArr,
  onSubmitHandler,
  onChangeHandler,
  nickName,
}) {
  return (
    <>
      <StyledContainer>
        <StyledInnerContainer>
          <StyledChatBlock>
            {chatArr &&
              chatArr.map((item, index) => (
                <StyledChat key={index}>
                  <div>닉네임 : {item.name}</div>
                  <p>메시지 : {item.message}</p>
                </StyledChat>
              ))}
          </StyledChatBlock>
        </StyledInnerContainer>
      </StyledContainer>
      {/* 인풋 */}
      <StyledChatInputBlock>
        <form onSubmit={onSubmitHandler}>
          <input placeholder="이름" name="name" value={nickName} disabled />
          <input
            placeholder="내용"
            name="message"
            onChange={(e) => onChangeHandler(e)}
          />
          <button>전송</button>
        </form>
      </StyledChatInputBlock>
    </>
  );
}
