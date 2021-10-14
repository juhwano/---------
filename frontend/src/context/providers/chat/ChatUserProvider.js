import { useState } from "react";
import ChatUserContext from "../../chat/ChatUserContext";

const ChatUserProvider = ({ children }) => {
  // 상태관리를 위한 useState
  const [userName, setUserName] = useState();
  //value로 userName과 setUserName 형태로 넘겨줌
  // ChatContext를 감싸고 children안의 모든 코드들은
  // useContext로 전역으로 해당 value값들을 받을 수 있다.
  return (
    <ChatUserContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </ChatUserContext.Provider>
  );
};

export default ChatUserProvider;
