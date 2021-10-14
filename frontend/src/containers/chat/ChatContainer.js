import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// 클라이언트 소켓은 처음 생성 한 후
import io from "socket.io-client";
import ChatComponent from "../../components/chat/ChatComponent";
import Cookies from "universal-cookie";
// 서버 측에 연결을 요청합니다.
const socket = io.connect("http://localhost:5000");
// 서버 소켓에 연결이 받아지면 데이터를 송수신하고
socket.emit("init", { name: "jh" });

export default function ChatContainer() {
  const cookies = new Cookies();
  const nickName = cookies.get("userName");
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({
    name: nickName,
    message: "",
    // timeStamp: Date.now(),
  });
  const day = dayjs().format("YYYY.MM.DD. dddd. HH:mm");
  // 연결
  useEffect(() => {
    return () => {
      //모든 처리가 완료되면 소켓을 닫습니다.
      socket.close();
    };
  }, []);

  // 이벤트 발생
  useEffect(() => {
    //이벤트 콜백함수 등록
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    });
  }, []);

  const onSubmitHandler = (e) => {
    //버튼 클릭 시 send message 이벤트 발생
    e.preventDefault();
    socket.emit("send message", {
      name: nickName,
      message: chat.message,
      timeStamp: day,
    });
  };

  const onChangeHandler = (e) => {
    const changeInput = e.target.value;
    console.log("value", changeInput);
    setChat({
      ...chat,
      message: changeInput,
    });
    console.log("chat", chat);
  };

  return (
    <ChatComponent
      chatArr={chatArr}
      onSubmitHandler={onSubmitHandler}
      onChangeHandler={onChangeHandler}
      nickName={nickName}
    />
  );
}
