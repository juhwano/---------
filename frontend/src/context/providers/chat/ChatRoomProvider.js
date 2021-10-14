import { useState } from "react";
import ChatRoomContext from "../../chat/ChatRoomContext";

const ChatRoomProvider = ({ children }) => {
  // 상태관리를 위한 useState
  const [roomName, setRoomName] = useState();
  //value로 userName과 setUserName 형태로 넘겨줌
  // ChatContext를 감싸고 children안의 모든 코드들은
  // useContext로 전역으로 해당 value값들을 받을 수 있다.
  return (
    <ChatRoomContext.Provider
      value={{
        roomName,
        setRoomName,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

export default ChatRoomProvider;
