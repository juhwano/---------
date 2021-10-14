import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatInput from "../../components/chat/ChatInput";
import ChatLog from "../../components/chat/ChatLog";
import Loading from "../../components/common/Loading";
import ChatRoomContext from "../../context/chat/ChatRoomContext";
import ChatUserContext from "../../context/chat/ChatUserContext";
export default function ChatContainer() {
  const { userName } = useContext(ChatUserContext);
  const { roomName } = useContext(ChatRoomContext);

  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <div>
      {currentSocket ? (
        <>
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}
