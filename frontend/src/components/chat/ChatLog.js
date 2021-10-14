import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoomContext from "../../context/chat/ChatRoomContext";
import { FaRocketchat } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`;

const LeftInnerBarContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
  /* background-color: red; */
`;

const RightInnerBarContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`;

const StyledChatTitleContainer = styled.div`
  display: flex;
  font-size: 1.3rem;
  justify-content: space-between;
`;

const StyledChatContentWrapper = styled.div`
  color: #ff69b4;
`;

const StyledIcon = styled(HiX)`
  margin-right: 5%;
`;
const ChatLog = ({ socket }) => {
  const [msgList, setMsgList] = useState([]);
  const { roomName } = useContext(ChatRoomContext);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
      console.log("클라이언트 msg2", messageItem);
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
      console.log("클라이언트 system1", systemMessage);
    });
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <BarContainer>
        <LeftInnerBarContainer>
          <FaRocketchat size="36" />
          <h3>{roomName}</h3>
        </LeftInnerBarContainer>
        <RightInnerBarContainer>
          <Link to="/">
            <StyledIcon />
          </Link>
        </RightInnerBarContainer>
      </BarContainer>

      <div>
        {msgList.map((msg, idx) => (
          <div key={idx}>
            <StyledChatTitleContainer>
              <div>{msg.userName}</div>
              <div>{msg.timeStamp}</div>
            </StyledChatTitleContainer>
            <StyledChatContentWrapper>{msg.msg}</StyledChatContentWrapper>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatLog;
