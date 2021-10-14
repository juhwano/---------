import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ChatRoomContext from "../../context/chat/ChatRoomContext";
import ChatUserContext from "../../context/chat/ChatUserContext";

const RoomContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const RoomWrapper = styled.div``;

const RoomInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
`;

const RoomTitle = styled.h1`
  color: #000;
  /* font-size: 2.5em; */
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

const RoomButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 20px;
`;

export default function ChatRoomContainer() {
  const { userName } = useContext(ChatUserContext);
  const { roomName, setRoomName } = useContext(ChatRoomContext);
  // const handleUserNameChange = (e) => {
  //   setUserName(e.target.value);
  // };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  localStorage.setItem("userName", userName);
  localStorage.setItem("roomName", roomName);
  return (
    <RoomContainer>
      <RoomWrapper>
        <RoomTitle>채팅방</RoomTitle>
        <div>
          <RoomInput
            name="room-name"
            placeholder="방 제목"
            onChange={handleRoomNameChange}
            className="joinInput"
          />
        </div>
        <div>
          <RoomInput name="user-name" value={userName} disabled />
        </div>
        <Link to="/chat">
          <RoomButton>채팅 참여하기</RoomButton>
        </Link>
      </RoomWrapper>
    </RoomContainer>
  );
}
