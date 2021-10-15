import axios from "axios";
import { history } from "../../index";

const client = axios.create();
// url 설정
client.defaults.baseURL = "http://localhost:3000/lov";
// 추가 정보 미입력 시 정보입력 페이지로 이동
// 응답에 대한 요청을 가로채서 핸들링
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    console.log(error.response);
    console.log("status", status);

    if (status === 401) {
      history.push("/addprofile");
    }

    return Promise.reject(error);
  }
);

export default client;
