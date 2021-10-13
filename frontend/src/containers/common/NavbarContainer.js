import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";

function NavbarContainer() {
  const history = useHistory();
  // useContext로 authInfo 받아와서 props로 활용
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const onClickProfileImg = () => {
    setVisible(!visible);
  };

  const onClickEditProfile = () => {
    history.push("/edit/profile");
    setVisible(false);
  };

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");

    client.defaults.headers.common["Authorization"] = ``;
    setAuthInfo({ ...authInfo, isLoggedIn: false });
    toast.dark("🚀로그아웃 완료 !");
    history.push("/");
    setVisible(false);
  };
  return (
    <NavbarComponent
      authInfo={authInfo}
      visible={visible}
      onClickLogout={onClickLogout}
      onClickProfileImg={onClickProfileImg}
      onClickEditProfile={onClickEditProfile}
    />
  );
}

export default NavbarContainer;
