import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthForm from "../../components/auth/AuthForm";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";
import Cookies from "universal-cookie";

function SignInForm() {
  const history = useHistory();
  // context API 아무때나 불러올 수 있다
  const { setAuthInfo } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
  });
  const cookies = new Cookies();

  const onChagenInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      /* 
      axios({
        method: 'post",
        url:''
      }) -> 진행
      client는 axios의 모듈화 (다른 형태)
      client.메소드(url, 바디값) -> get은 첫번째
      */
      const response = await client.post("/auth/signin", {
        email: form.email,
        password: form.password,
      });
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        cookies.set("userToken", accessToken, {
          path: "/",
        });
        /*
          axios({
            headers : {
              authorization : token
            }
          })
        */
        //클라이언트의 모든 요청에 헤더에 토큰을 보내겠다. 토큰이 필요 없는 경우도 보내도 상관없다.
        //토큰이 필요 없는 경우 undefined로 들간다.
        client.defaults.headers.common["Authorization"] = `${accessToken}`;
        const result = await client.get("/auth/profile");
        //전역 상태관리
        setAuthInfo({ isLoggedIn: true, authInfo: result.data.data });
        //home으로 이동
        console.log(result.data.data);
        cookies.set("userName", result.data.data.nickName, {
          path: "/",
        });
        localStorage.setItem("userImage", result.data.data.profileImage);
        history.push("/");
        toast.dark("🚀로그인 완료 !");
      }
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status === 400) {
        setError("🔥올바른 값을 입력해주세요.");
      } else if (error.response.status === 404) {
        setError("🔥올바른 값을 입력해주세요.");
      } else {
        setError("서버 오류");
      }
    }
  };

  return (
    <AuthForm
      type="login"
      onClickSubmit={onClickSubmit}
      form={form}
      onChagenInput={onChagenInput}
      error={error}
    />
  );
}

export default SignInForm;
