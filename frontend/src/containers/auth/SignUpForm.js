import React, { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ToastsStore } from "react-toasts";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";

function SignUpForm() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    nickName: "",
    password: "",
    passwordConfirm: "",
    confirmMsg: "📝패스워드를 입력해주세요.",
  });

  const onChagenInput = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "passwordConfirm") {
        if (value !== form.password) {
          setError("🔥패스워드가 일치하지 않습니다.");
        } else {
          setError("");
        }
      }
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const onClickSubmit = async (e) => {
    e.preventDefault();

    console.log("error", error);

    try {
      const response = await client.post("/auth/signup", {
        email: form.email,
        nickName: form.nickName,
        password: form.password,
      });
      console.log(response);
      //에러 핸들링
      if (response.status === 200) {
        console.log("회원가입 성공");
        toast.dark("🚀회원가입 완료 !");
        history.push("/signin");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("🔥중복 아이디가 존재합니다.");
      } else if (error.response.status === 404) {
        setError("경로 오류");
      } else {
        setError("🔥올바른 값을 입력해주세요.");
      }
    }
  };

  return (
    <AuthForm
      onClickSubmit={onClickSubmit}
      onChagenInput={onChagenInput}
      type="register"
      error={error}
      form={form}
    />
  );
}

export default SignUpForm;
